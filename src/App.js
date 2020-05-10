import React from 'react';
//import ItemId from './components/ItemId';
import './App.css';

var newNews = [];
function Newspaper({ title, text, by }) {
  //console.log(item);
  return (
    <article>
      <h5 className='p-2 border'>{title}</h5>
      <div className='p-2 border'>{text}</div>
      <div className='p-2 border'>{by}</div>
    </article>
  );
}

function App() {
  const [news, setNews] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [url, setUrl] = React.useState(
    'https://hacker-news.firebaseio.com/v0/askstories.json?print=prett'
  );

  React.useEffect(() => {
    setLoading(true);

    async function get_id() {
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data) {
          data.map(async (item) => {
            const response2 = await fetch(
              `https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`
            );
            const data2 = await response2.json();
            const { id, title, text, by } = data2;
            const data3 = { id, title, text, by };

            newNews.push(data3);
            setNews(newNews);

            //console.log(newNews);
          });
        } else {
          setNews([]);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }

    get_id();
  }, [url, news]);

  //console.log(news);
  // console.log(news.length);

  if (loading) return <h2>loading...</h2>;
  console.log(newNews);
  return (
    <section>
      <div className='head'>
        <div className='headerobjectswrapper'>
          <div className='weatherforcastbox'>
            <span style={{ fontFamily: 'italic' }}>
              Weatherforcast for the next 24 hours: Plenty of Sunshine
            </span>
            <span>Wind: 7km/h SSE; Ther: 21°C; Hum: 82%</span>
          </div>
          <header>Daily worker</header>
        </div>

        <div className='subhead'>
          York, MA - Thursday August 30, 1978 - Seven Pages
        </div>
      </div>
      <div className='container mt-3'>
        <div className='d-flex flex-wrap bg-light'>
          {news.map((item) => {
            return <Newspaper key={item.id} {...item} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default App;
