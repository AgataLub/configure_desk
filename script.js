"use strict";

//Global variables
let elementToPaint;

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");

  loadSVG();
}

function loadSVG() {
  console.log("loadSVG");
  fetch("table_1.svg")
    .then((response) => response.text())
    .then((desk) => {
      document.querySelector(".desk").innerHTML = desk;
    });
  addInteractivity();
}

function addInteractivity() {
  console.log("addInteractivity");
  document.querySelectorAll(".interact").forEach((deskelement) => {
    console.log(deskelement);

    deskelement.addEventListener("click", clickOn);
    deskelement.addEventListener("mouseover", mouseOver);
    deskelement.addEventListener("mouseout", mouseOut);
  });

  document.querySelectorAll(".colorbox").forEach((coloroption) => {
    coloroption.addEventListener("click", chooseColor);
  });

  document.querySelectorAll(".materialbox").forEach((materialoption) => {
    materialoption.addEventListener("click", chooseMaterial);
  });
}

function clickOn() {
  console.log("clickOn");

  elementToPaint = this;
  this.style.fill = "red";
}

function mouseOver() {
  console.log("mouseOver");
  this.style.strokeStyle = "blue";
  this.style.cursor = "pointer";
}

function mouseOut() {
  this.style.strokeStyle = "none";
}

function chooseColor() {
  if (elementToPaint != undefined) {
    elementToPaint.style.fill = this.getAttribute("backgroundColor");
  }
}

function chooseMaterial() {}
