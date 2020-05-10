import React from 'react';
import ItemId from './ItemId';

export default async function getID() {
  var data = [];
  try {
    const response = await fetch(
      'https://hacker-news.firebaseio.com/v0/askstories.json?print=prett'
    );
    data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  return <ItemId props={data} />;
}
