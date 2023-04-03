import React, { FC } from "react";
import { useGetTagsQuery } from "../api/tagsApi";
import { Tag } from "./Tag";
import styles from './Tags.module.scss';
import classNames  from 'classnames';

interface ITagsProps {
  getTagForFilter: (tag: string) => void;
}

export const Tags: FC<ITagsProps> = ({getTagForFilter}) => {
  const { data: tagsList, isLoading, isError } = useGetTagsQuery();

  return (
    <div className="">
      {isLoading ? (
        <h1>Идет загрузка...</h1>
      ) : (
        <ul className={classNames(styles.tags)}>
          {tagsList?.map((tag) => (
              <Tag key={tag.text} tag={tag} getTagForFilter={getTagForFilter}/>
          ))}
        </ul>
      )}
      {isError && <h1>Ошибка загрузки тегов...</h1>}
    </div>
  );
};
