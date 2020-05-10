import React from 'react';
import './App.css';

var newNews = [];
function Newspaper({ title, text, by }) {
  return (
    <div className='cocktail'>
      <div className='flex-row-item'>
        <span class='headline hl3'>{title}</span>
        <p>
          <span class='headline hl4'>{by}</span>
        </p>
        <p>{text}</p>
      </div>
    </div>
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
  if (loading) return <h1>loading..</h1>;

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

      <div className='section'>
        <div class='content'>
          <div class='collumns'>
            <div class='collumn'>
              <div class='head'>
                <div className='cocktails-center'>
                  {news.map((item) => {
                    return <Newspaper key={item.id} {...item} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
