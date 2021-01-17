/* eslint-disable spaced-comment */
/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.scss' {
  const content: { [className: string]: string }
  export default content
}

declare global {}

declare type Nullable<T> = T | null
