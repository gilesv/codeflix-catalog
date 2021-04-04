import { CastMember, CastMemberKind } from "@prisma/client";

export default class CastMemberFactory {
  static new(name: string = 'Actor', isActive: boolean = true): CastMember {
    return {
      id: 'ABCD-0000-1111-2222',
      name,
      type: CastMemberKind.ACTOR,
      isActive,
      createdAt: new Date(),
      updatedAt: null,
    };
  }

  static list(length = 3): CastMember[] {
    return Array(length).fill(CastMemberFactory.new());
  }
}
