import React, { useEffect, useState } from 'react';
import { Icon } from '../';
import Style from './style.module.scss';
import classNames from 'classnames';

type ScrollDownButtonProps = {
  targetId: string;
}

export function ScrollDownButton({
  targetId
}: ScrollDownButtonProps) {
  const [hasScrolledDown, setHasScrolledDown] = useState(false);

  useEffect(() => {

  });

  function handleClick() {
    console.log('click', document.getElementById(targetId)?.offsetTop)
    scrollTo({
      top: document.getElementById(targetId)?.offsetTop
    });
  }

  const className = classNames(Style['scroll-down-button'], {
    [Style['hidden']]: hasScrolledDown
  });

  return (
    <div className={className} onClick={handleClick}>
      <Icon name='south' />
    </div>
  );
}