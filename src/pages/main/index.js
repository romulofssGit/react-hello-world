import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api';

import './style.css';

export default class Main extends Component {
	state = {
		produtos: [],
		productInfo: {},
		page: 1
	}

	componentDidMount() {
		this.loadProducts();
	}

	loadProducts = async (page = 1) => {
		try {
		const objResponse = await api.get(`/products?page=${page}`);
			console.log(objResponse);

			const {docs, ...productInfo} = objResponse.data;

			this.setState({
				produtos: docs,
				productInfo,
				page
			});

		} catch (error) {
			console.error('Erro get produtos', error);

		}
	}

	nextPage = () => {
		const {page, productInfo} = this.state;
		if (page === productInfo.pages) {
			return;
		}

		const pageNumber = page+1;

		this.loadProducts(pageNumber);
	}

	prevPage = () => {
		const {page} = this.state;
		if (page === 1) {
			return;
		}

		const pageNumber = page-1;

		this.loadProducts(pageNumber);
	}

	render() {
		const {produtos} = this.state;

		return (
			<div className="product-list">
				{produtos.map(produto => (
					<article key={produto._id}>
						<strong>{produto.title}</strong>
						<p>{produto.description}</p>
						<Link to={`/products/${produto._id}`}>Acessar</Link>
					</article>

				))}

				<div className="actions">
					<button onClick={this.prevPage}> Anterior</button>
					<button onClick={this.nextPage}>Próximo</button>
				</div>
			</div>

		);
	}
}