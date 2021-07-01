export type RequireOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, Keys>> & Partial<Record<Exclude<Keys, K>, undefined>>
  }[Keys]
