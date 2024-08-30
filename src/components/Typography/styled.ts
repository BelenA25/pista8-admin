import { createElement, ReactNode, ElementType } from 'react';
import styled, { css } from 'styled-components';

interface DynamicTypographyProps {
  tag: ElementType;
  children: ReactNode;
  [key: string]: any;
}

export const DynamicTypography = styled(({ tag, children, ...props }: DynamicTypographyProps) =>
  createElement(tag, props, children),
)`
  ${({ tag }) => {
    switch (tag) {
      case 'h1':
        return css`
          font-size: 2.2rem;
          font-weight: bold;
          color: #FE420A;
        `;
      case 'h2':
        return css`
          font-size: 2rem;
          font-weight: bold;
        `;
      case 'h3':
        return css`
          font-size: 1.75rem;
          font-weight: bold;
        `;
      case 'h4':
        return css`
          font-size: 1.5rem;
          font-weight: bold;
        `;
      case 'h5':
        return css`
          font-size: 1.25rem;
          font-weight: bold;
        `;
      case 'h6':
        return css`
          font-size: 1rem;
          font-weight: bold;
        `;
      case 'p':
        return css`
          font-size: 0.87rem;
          font-weight: normal;
          font-family: 'Lato', sans-serif;
        `;
      case 'span':
        return css`
          font-size: 0.875rem;
          font-weight: normal;
          font-family: 'Lato', sans-serif;
        `;
      default:
        return css`
          font-size: 1rem;
          font-weight: normal;
          font-family: 'Lato', sans-serif;
        `;
    }
  }}
`;
