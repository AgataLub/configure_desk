"use strict";

// Global variables
let elementToPaint;

// Model for the features
const features = {
  blackLamp: false,
  blueLamp: false,
  plant: false,
  globe: false
}

window.addEventListener("DOMContentLoaded", init);

function init() {
  loadSVG();
}

function loadSVG() {
  console.log("loadSVG");
  fetch("table_1.svg")
    .then((response) => response.text())
    .then((desk) => {
      document.querySelector(".desk").innerHTML = desk;
    })
    .then(addInteractivity)
}

function addInteractivity() {
  document.querySelectorAll(".interact").forEach((deskElement) => {
    deskElement.addEventListener("click", clickOn);
    deskElement.addEventListener("mouseover", mouseOver);
    deskElement.addEventListener("mouseout", mouseOut);
  });

  document.querySelectorAll(".colorbox").forEach((colorOption) => {
    colorOption.addEventListener("click", chooseColor);
  });

  document.querySelectorAll(".materialbox").forEach((materialOption) => {
    materialOption.addEventListener("click", chooseMaterial);
  });

  document.querySelectorAll(".feature-item").forEach((featureItem) =>
    featureItem.addEventListener("click", toggleFeatures));
}

function clickOn() {
  elementToPaint = this;
  this.style.fill = "grey";

  if (this == "right-leg") {
    console.log("o")
    document.querySelector("li #top-desk").style.fontWeight = "bold"
  }
}

function mouseOver() {
  this.style.stroke = "red";
  this.style.cursor = "pointer";
}

function mouseOut() {
  this.style.stroke = "none";
}

function chooseColor() {
  if (elementToPaint != undefined) {
    elementToPaint.style.fill = this.getAttribute("fill");
  }
}

function chooseMaterial() {
  if (elementToPaint != undefined) {
    elementToPaint.style.fill = "#cb997e";
  }
}

function toggleFeatures(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;

  // Toggles the features
  features[feature] = !features[feature]

  if (features[feature] == true) {
    // Adds the feature element
    target.classList.add("chosen");
    document.querySelector(`[data-feature="${feature}"]`).classList.remove("hide");

    const featureElement = createFeatureElement(feature);
    document.querySelector("#selected ul").appendChild(featureElement);

    // FLIP
    const start = target.getBoundingClientRect();
    const end = featureElement.getBoundingClientRect();

    const diffX = start.x -end.x;
    const diffY = start.y - end.y;

    featureElement.style.transform = `translate(${diffX}px, ${diffY}px)`; 
    featureElement.offsetHeight;

    featureElement.style.transition = "transform 1s";
    featureElement.style.transform = "translate(0,0)";

  } else {
    // Removes the feature element
    target.classList.remove("chosen");
    const featureElement = document.querySelector(`#selected [data-feature="${feature}"]`);
    featureElement.classList.add("hide");

    document.querySelector(`[data-feature="${feature}"]`).classList.add("hide");
  }
}

// Create a feature element, which is appened to the #selected ul
function createFeatureElement(feature) {
  const li = document.createElement("li");
  li.dataset.feature = feature;

  const img = document.createElement("img");
  img.src = `${feature}.png`;

  li.append(img);

  return li;
}