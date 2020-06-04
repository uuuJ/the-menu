// Burger object
//
// { type: 'TYPE', item: 'ITEM' }
//
// Golden rules of a burger
//
// 1 - Bun on top and bottom
// 2 - Use the same type of bun
// 3 - The cheese should always be above the beef => If there is cheese, beef is underneath
// 4 - The lettuce should always be below a bun => If there is lettuce, bun is over
// 5 - Never stack two buns on top of another
// 6 - Never use the same ingredient on top of another
//
// Optional rule
//
// 1 - Vegetarian (contains no beef or bacon)
//

import { TYPES, ITEMS, CLASSIC_BUNS, DARK_BUNS } from '../constants/burger'

export const isBurgerValid = burger => {
  return bunTopBottomChecker(burger) 
    && sameTypeOfBunChecker(burger)
    && cheeseAboveBeefChecker(burger)
    && bunOverLettuceChecker(burger)
    && bunsDontStackChecker(burger)
    && dontStackSameIngredientChecker(burger)
    && veggieChecker(burger)
}

export const bunTopBottomChecker = burger => {
  if(!burger || burger.length<2) return false

  const bottom = burger[0]
  const top = burger[burger.length-1]
  const typeMatch = top.type === TYPES.BUN && bottom.type === TYPES.BUN
  const topItemMatch = top.item === DARK_BUNS.DARK_BUN_TOP || top.item === CLASSIC_BUNS.CLASSIC_BUN_TOP 
  const bottomItemMatch = bottom.item === DARK_BUNS.DARK_BUN_BOTTOM || bottom.item === CLASSIC_BUNS.CLASSIC_BUN_BOTTOM 
  return  typeMatch && topItemMatch && bottomItemMatch
}

export const sameTypeOfBunChecker = burger =>{
  if(!burger || burger.length<2) return false
  
  const bottom = burger[0]
  const top = burger[burger.length-1]
  const classicItemMatch = top.item === CLASSIC_BUNS.CLASSIC_BUN_TOP && bottom.item === CLASSIC_BUNS.CLASSIC_BUN_BOTTOM 
  const darkItemMatch = top.item === DARK_BUNS.DARK_BUN_TOP && bottom.item === DARK_BUNS.DARK_BUN_BOTTOM 
  return classicItemMatch || darkItemMatch
}

export const cheeseAboveBeefChecker = (burger,index = 0) => {
  if(!burger || burger.length<2) return false

  let cheeseIsOk = true
  burger.reduce((prev,curr)=>{
    if(curr.item == ITEMS.CHEESE && prev.item != ITEMS.BEEF) cheeseIsOk = false
    return curr
  })
  return cheeseIsOk
}

export const bunOverLettuceChecker = (burger,index = 0) => {
  if(!burger || burger.length<2) return false
  let lettuceIsOk = true
  burger.reduce((prev,curr)=>{
    console.log(curr)
    if(curr.item == ITEMS.LETTUCE && prev.type != TYPES.BUN) lettuceIsOk = false
    return curr
  })
  return lettuceIsOk
}


export const bunsDontStackChecker = (burger,index = 0) => {
  if(!burger || burger.length<2) return false
  let consecutiveBuns = false
  burger.reduce((prev,curr)=>{
    if( prev.type == curr.type && curr.type == TYPES.BUN) consecutiveBuns =true;
    return curr
  })
  return !consecutiveBuns
}

export const dontStackSameIngredientChecker = (burger,index = 0) => {
  if(!burger || burger.length<2) return false
  let consecutiveIngredients = false
  burger.reduce((prev,curr)=>{
    if( prev.item == curr.item) consecutiveIngredients =true;
    return curr
  })
  return !consecutiveIngredients
}

export const veggieChecker = burger => {
  if(!burger || burger.length<2) return false

  return burger.filter(elem => elem.item == ITEMS.BACON || elem.item == ITEMS.CHEESE ).length == 0
}