import React from "react";

import {
  AppBar,
  Tab,
  Tabs,
  FormControlLabel,
  Checkbox,
  Badge,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import JokeCard from "../joke-card/JokeCard";

import jokeImg from "../../assets/image.jpg";
import spinner from "../../assets/spinner.gif";

import "./joke.style.css";

const useStyles = makeStyles({
  indicator: {
    backgroundColor: "grey",
  },
});

const Joke = ({
  jokesToShow,
  categories,
  likeJoke,
  unlikeJoke,
  filterCategories,
  categoryMatch,
  toggleCategory,
  currentTab,
  changeTab,
  liked,
  loading,
}) => {
  const classes = useStyles();

  return (
    <div className="joke">
      <AppBar
        style={{ marginBottom: 10 }}
        position="static"
        color="text.primary"
        className={classes.indicator}
        id="app-bar"
      >
        <Tabs
          value={currentTab}
          onChange={changeTab}
          // indicatorColor="secondary"
          classes={{
            indicator: classes.indicator,
          }}
          // inkBarStyle={{background: 'grey'}}
          centered
        >
          <Tab label="Home" id="home-tab" aria-controls="home-panel" />
          <Tab
            label={
              <Badge
                color="secondary"
                badgeContent={liked.length > 0 ? liked.length : null}
              >
                Likes
              </Badge>
            }
            id="like-tab"
            aria-controls="like-panel"
          />
        </Tabs>
      </AppBar>
      <div role="tabpanel" hidden={currentTab !== 0}>
        {/* Category Filter */}
        {categories.map((category) => {
          return (
            <FormControlLabel
              id="checkbox"
              key={category}
              control={
                <Checkbox
                  name={category}
                  color="text.primary"
                  checked={filterCategories.includes(category)}
                  onChange={toggleCategory}
                />
              }
              label={category}
            ></FormControlLabel>
          );
        })}
        {/* Joke Cards */}
        <div className="list">
          {jokesToShow.map((joke, index) => {
            if (
              joke.categories.length === 0 ||
              categoryMatch(joke.categories)
            ) {
              return (
                <JokeCard
                  key={joke.id}
                  joke={joke}
                  likeJoke={likeJoke}
                  unlikeJoke={unlikeJoke}
                  index={index}
                />
              );
            }
          })}
          {loading && (
            <div className="spinner">
              <img className="loading-img" src={spinner} alt="" />
            </div>
          )}
        </div>
      </div>
      <div role="tabpanel" hidden={currentTab !== 1}>
        <div className="list">
          {liked.length > 0 ? (
            liked.map((joke) => {
              return (
                <JokeCard
                  key={joke.id}
                  joke={joke}
                  likeJoke={likeJoke}
                  unlikeJoke={unlikeJoke}
                />
              );
            })
          ) : (
            <div className="no-likes">
              <img className="joke-img" src={jokeImg} alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Joke;
