import { Field, InputType, ObjectType } from '@nestjs/graphql'

@ObjectType()
@InputType('TocInput')
export class TocModel {
  @Field()
  public readonly id: string

  @Field()
  public readonly level: string

  @Field()
  public readonly text: string
}
