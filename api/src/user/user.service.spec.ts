import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { PrismaClient } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { ChestModule } from '../chest/chest.module'
import { MysteryChestModule } from '../mystery-chest/mystery-chest.module'

describe('UserService', () => {
  let service: UserService
  let prisma

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ChestModule, MysteryChestModule],
      providers: [UserService, PrismaService]
    }).compile()

    service = module.get<UserService>(UserService)
    prisma = module.get<PrismaClient>(PrismaService)
  })
  afterEach(async () => {
    jest.resetModules()
    await prisma.$disconnect()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
