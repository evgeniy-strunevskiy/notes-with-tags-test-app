import React, { FC } from "react";
import { ITag } from "../types/tagTypes";
import styles from './Tag.module.scss';
import classNames  from 'classnames';

interface ITagProps {
  getTagForFilter: (tag: string) => void;
  tag: ITag;
}

export const Tag: FC<ITagProps> = ({ getTagForFilter, tag }) => {
  return (
    <li>
      <button
        className={classNames(styles.tag)}
        onClick={() => getTagForFilter(tag.text)}
      >
        {tag.text}
      </button>
    </li>
  );
};
