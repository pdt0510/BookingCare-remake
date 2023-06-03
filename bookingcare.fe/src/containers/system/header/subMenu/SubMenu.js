import React, { Component } from 'react';
import './SubMenu.scss';
import { FormattedMessage } from 'react-intl';
import * as constVals from '../../../../utilities';
import { Link } from 'react-router-dom';

class SubMenu extends Component {
 getParentEle = (ele) => {
  while (ele && ele.parentNode) {
   if (ele.classList[0] === constVals.nameKeysValues.menuGroupClass) {
    return ele;
   }
   ele = ele.parentNode;
  }
 };

 removeParentActive = (activedEle) => {
  const { activeClass, menuGroupClass } = constVals.nameKeysValues;

  while (activedEle && activedEle.parentNode) {
   if (activedEle.classList[0] === menuGroupClass) {
    activedEle.classList.remove(activeClass);
    return;
   }
   activedEle = activedEle.parentNode;
  }
 };

 addParentActive = (currentEle) => {
  const { activeClass, menuGroupClass } = constVals.nameKeysValues;

  while (currentEle && currentEle.parentNode) {
   if (currentEle.classList[0] === menuGroupClass) {
    currentEle.classList.add(activeClass);
    return;
   }
   currentEle = currentEle.parentNode;
  }
 };

 handleActive = (event) => {
  const { activeClass, menuGroupClass } = constVals.nameKeysValues;
  const currentEle = event.target;
  let currentEleIsActived = false;

  if (currentEle) {
   const length = currentEle.classList.length;
   for (let idx = 0; idx < length; idx++) {
    if (currentEle.classList[idx] === activeClass) {
     currentEleIsActived = true;
     break;
    }
   }
  }

  if (currentEleIsActived === false) {
   const activedEle = document.querySelector(
    `.header-content .${menuGroupClass} .subMenu .${activeClass}`,
   );

   const currentParent = this.getParentEle(currentEle);
   const activedParent = this.getParentEle(activedEle);

   if (currentParent.id !== activedParent.id) {
    this.removeParentActive(activedEle);
    this.addParentActive(currentEle);
   }

   activedEle.classList.remove(activeClass);
   currentEle.classList.add(activeClass);
  }
 };

 renderSubMenu = () => {
  let { subMenu, usingPath } = this.props;
  const { activeClass } = constVals.nameKeysValues;

  const subMenuList = subMenu.map((item, idx) => {
   const { name, link } = item;

   return (
    <Link
     to={link}
     key={idx}
     className={`subMenuLink ${usingPath === link ? activeClass : ''}`}
     onClick={this.handleActive}
    >
     <FormattedMessage id={name} />
    </Link>
   );
  });
  return subMenuList;
 };

 render() {
  return <ul className='subMenu'>{this.renderSubMenu()}</ul>;
 }
}

export default SubMenu;
