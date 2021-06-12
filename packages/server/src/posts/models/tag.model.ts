import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TagModel {
  @Field(() => ID)
  public readonly _id: string

  @Field()
  public readonly name: string

  @Field()
  public readonly label: string
}
