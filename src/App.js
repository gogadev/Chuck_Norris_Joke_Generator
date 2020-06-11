import React, { useState, useEffect } from "react";

import Header from "./components/header/Header";
import Form from "./components/form/Form";
import Joke from "./components/joke/Joke";

import "./App.css";

const App = () => {
  const [jokes, setJokes] = useState([]);
  const [jokesToShow, setJokesToShow] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);

  const [liked, setLiked] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("Chuck");
  const [lastName, setLastName] = useState("Norris");

  useEffect(() => {
    setLoading(true);
    fetchAndSetJokes();

    fetch("https://api.icndb.com/categories")
      .then((res) => res.json())
      .then((res) => {
        setCategories(res.value);
        setFilterCategories(res.value);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const fetchAndSetJokes = () => {
    fetch(
      `https://api.icndb.com/jokes?firstName=${firstName}&lastName=${lastName}`
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setJokes(res.value);
        setJokesToShow(res.value.slice(0, 5));
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const likeJoke = (id) => {
    if (liked.find((j) => j.id === id)) return;
    const likedJoke = jokes.find((j) => j.id === id);
    setLiked([likedJoke, ...liked]);
  };

  const unlikeJoke = (id) => {
    const newlikedJokes = liked.filter((j) => j.id !== id);
    setLiked(newlikedJokes);
  };

  const changeTab = (event, value) => {
    setCurrentTab(value);
  };

  const addMoreJokes = () => {
    setLoading(true);
    setTimeout(() => {
      setJokesToShow(jokes.slice(0, jokesToShow.length + 5));
      setLoading(false);
    }, 500);
  };

  const observeElement = (bottomJoke) => {
    if (!bottomJoke) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true) {
          addMoreJokes();
          observer.unobserve(bottomJoke);
        }
      },
      {
        threshold: 1,
      }
    );
    observer.observe(bottomJoke);
  };

  useEffect(() => {
    const bottomJokeEl = document.getElementById(
      `joke-${jokesToShow.length - 1}`
    );
    observeElement(bottomJokeEl);
  }, [jokesToShow]);

  const toggleCategory = (event) => {
    const category = event.target.name;
    if (filterCategories.includes(category)) {
      // If found then remove
      const filterCategoriesCopy = [...filterCategories];
      const categoryIndex = filterCategoriesCopy.indexOf(category);
      filterCategoriesCopy.splice(categoryIndex, 1);
      setFilterCategories(filterCategoriesCopy);
    } else {
      // Else add it
      setFilterCategories([...filterCategories, category]);
    }
  };

  const categoryMatch = (jokeCategories) => {
    for (let i = 0; i < jokeCategories.length; i++) {
      if (filterCategories.includes(jokeCategories[i])) return true;
    }
    return false;
  };

  const changeName = (e) => {
    e.preventDefault();
    if (firstName === "" || lastName === "") return;
    fetchAndSetJokes();
  };

  return (
    <React.Fragment>
      <Header />
      <Form
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        changeName={changeName}
      />
      <Joke
        jokesToShow={jokesToShow}
        likeJoke={likeJoke}
        unlikeJoke={unlikeJoke}
        categories={categories}
        currentTab={currentTab}
        changeTab={changeTab}
        liked={liked}
        loading={loading}
        filterCategories={filterCategories}
        toggleCategory={toggleCategory}
        categoryMatch={categoryMatch}
      />
    </React.Fragment>
  );
};

export default App;
