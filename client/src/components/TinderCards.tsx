import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import 'styles/TinderCards.css';

interface Stock {
	logoUrl: string;
	ipo: string;
	ticker: string;
	index: string;
	name: string;
	sector: string;
	marketCap: string;
	dateFetched: string;
}

interface MarketNewsStory {
	category: string;
	datetime: EpochTimeStamp;
	headline: string;
	id: number;
	image: string;
	related: string;
	source: string;
	summary: string;
	url: string;
}

interface CompanyNewsStory {
	datetime: EpochTimeStamp; // 1661013000,
	category: string; // "company",
	headline: string; // "Things Just Got Tougher for Peloton",
	id: number; // 115338334,
	image: string; // "https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo-1200x1200.png",
	related: string; // "AAPL",
	source: string; // "Yahoo",
	summary: string; // "How challenging Peloton Interactive's balance sheet is right now.  Why Peloton will almost certainly have to raise money.  Why Costco Wholesale is his favorite retail stock, followed closely by Home Depot.",
	url: string; // "https://finnhub.io/api/news?id=d45e940e9209715a2fcff8d49df8596f9ad5bee27cf9d2b3ea2a83ff18c21aaf"
}

function TinderCards() {
	function getWindowSize() {
		const { innerWidth, innerHeight } = window;
		return { innerWidth, innerHeight };
	}

	const [nextStack, fetchMore] = useState(<></>);
	const [stocks, setStocks] = useState<Stock[]>([]);
	const [marketNews, setMarketNews] = useState<MarketNewsStory[]>([]);
	const [windowSize, setWindowSize] = useState(getWindowSize());
	const [stockIndex, setStockIndex] = useState<number>(0);
	const [companyNews, setCompanyNews] = useState<CompanyNewsStory[]>([]);
	const [cardView, setCardView] = useState<number>(1);
	const MAX_CARD_VIEW = 4;
	const MIN_CARD_VIEW = 1;

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_SERVER_URL}tickers`).then((res) => {
			console.log(res.data);
			setStocks(res.data.companyProfilesArray);
		});
		getMarketNews().then(
			(response: any) => {
				console.log(response);
				setMarketNews(response.data);
				console.log('market news:', companyNews);
			},
			(error: any) => {}
		);
		getCompanyNews('AAPL') // HARD CODED!!
			.then(
				(response: any) => {
					setCompanyNews(response.data);
					console.log('company news:', companyNews);
				},
				(error: any) => {}
			);
	}, []);

	useEffect(() => {
		if (stocks.length === 0) {
			fetchMore(
				<button
					onClick={() => {
						axios
							.get(`${process.env.REACT_APP_SERVER_URL}/tickers`)
							.then((res) => {
								console.log(res.data);
								setStocks(res.data.companyProfilesArray);
							});
						console.log(stocks);
					}}
				>
					see more?
				</button>
			);
		}
	}, [stocks, stocks.length]);

	const getMarketNews = async () => {
		return axios.get(process.env.REACT_APP_SERVER_URL + 'getMarketNews');
	};

	const getCompanyNews = async (symbol: string) => {
		return axios.get(process.env.REACT_APP_SERVER_URL + 'getCompanyNews', {
			params: {
				symbol: symbol
			}
		});
	};

	const swiped = (direction: string, nameToDelete: string) => {
		console.log('removing:' + nameToDelete);
	};

	const outOfFrame = (name: string) => {
		console.log(name + ' left the screen!');
		setCardView(1);
		setStockIndex(stockIndex + 1);
	};

	const changeCardView = (event: any) => {
		setWindowSize(getWindowSize());
		if (event.pageX > windowSize.innerWidth / 2) {
			if (cardView < MAX_CARD_VIEW) setCardView(cardView + 1);
		} else {
			if (cardView > MIN_CARD_VIEW) setCardView(cardView - 1);
		}
		console.log('market news: ', marketNews);
	};

	return (
		<div className='tinderCards'>
			<div className='tinderCards__cardContainer'>
				{stocks.map((stock) => (
					<TinderCard
						className='tinderCards__swipe'
						key={stock.ticker}
						preventSwipe={['up', 'down']}
						onSwipe={(dir) => swiped(dir, stock.ticker)}
						onCardLeftScreen={() => outOfFrame(stock.ticker)}
					>
						{cardView === 1 && (
							<div
								className='tinderCards__card'
								onClick={(event) => changeCardView(event)}
							>
								<img
									className='stock__logo'
									src={stock.logoUrl}
									alt={`${stock.ticker} logo`}
								/>
								<div className='companyProfile'>
									<h3>{stock.ticker}</h3>
									<p>{`${stock.name} | ${stock.sector}`}</p>
									<p>Market Cap: {stock.marketCap}</p>
								</div>
							</div>
						)}
						{cardView === 2 && (
							<div
								className='tinderCards__card'
								onClick={(event) => changeCardView(event)}
							>
								<p>view 2</p>
							</div>
						)}
						{cardView === 3 && (
							<div
								className='tinderCards__card company_news'
								onClick={(event) => changeCardView(event)}
							>
								<h2>Company News</h2>
								{companyNews.map((story) => {
									return (
										<div
											key={story.id}
											className='story company_news'
										>
											<img
												alt={`${story.headline} image`}
												src={story.image}
											></img>
											<a
												href={story.url}
												className='company_news'
											>
												<p>{story.headline}</p>
											</a>
											<p>{story.source}</p>
											<p>{story.summary}</p>
											<p>{story.datetime}</p>
										</div>
									);
								})}
							</div>
						)}
						{cardView === 4 && (
							<div
								className='tinderCards__card company_news'
								onClick={(event) => changeCardView(event)}
							>
								<h2>Market News</h2>
								{marketNews.map((story) => {
									return (
										<div
											key={story.id}
											className='story company_news'
										>
											<img
												alt={`${story.headline} image`}
												src={story.image}
											></img>
											<a
												href={story.url}
												className='company_news'
											>
												<p>{story.headline}</p>
											</a>
											<p>{story.source}</p>
											<p>{story.summary}</p>
											<p>{story.datetime}</p>
										</div>
									);
								})}
							</div>
						)}
					</TinderCard>
				))}
				{nextStack}
			</div>
		</div>
	);
}

export default TinderCards;
