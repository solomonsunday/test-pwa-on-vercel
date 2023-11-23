import React, { FC } from 'react';
import './index.scss';

interface IProgress {
  percent: number;
}

export const Progress: FC<IProgress> = props => {
  const { percent } = props;

	return <div className='progress-component' style={{
		width: `${percent}%`,
	//  position: relative,
	// 	height: 0.375rem;
	// 	border- radius: 60px;
	// bottom: 3px;
	// background: $color - blue;
	}} />;
};
