
// from https://stackoverflow.com/a/53187807

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
* Returns the index of the last element in the array where predicate is true, and -1
* otherwise.
* @param array The source array to search in
* @param predicate find calls predicate once for each element of the array, in descending
* order, until it finds one where predicate returns true. If such an element is found,
* findLastIndex immediately returns that element index. Otherwise, findLastIndex returns -1.
*/
export function findLastIndex<T>(array: Array<T>, predicate: (value: T, index: number, obj: T[]) => boolean): number {
  let l = array.length;
  while (l--) {
    if (predicate(array[l], l, array))
      return l;
  }
  return -1;
}


/**
* Returns the  last element in the array where predicate is true, and undefined otherwise.
* @param array The source array to search in
* @param predicate find calls predicate once for each element of the array, in descending
* order, until it finds one where predicate returns true. If such an element is found,
* findLast immediately returns that element. Otherwise, findLast returns undefined.
*/
export function findLast<T>(array: Array<T>, predicate: (value: T, index: number, obj: T[]) => boolean): T | undefined {
  return array[findLastIndex(array, predicate)]
}


const titleRegex = /^This or That(: | - | \| )/
export function extractTitle(rawTitle: string): string {
  return rawTitle.replace(titleRegex, '')
}


export const ScrollToTopOnNavigate = (): null => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}
