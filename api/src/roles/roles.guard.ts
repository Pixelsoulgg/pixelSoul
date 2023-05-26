import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())

    if (!roles) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const user = request.user
    if (!user.roles) {
      return false
    }
    return this.matchRoles(roles, user.roles)
  }
  private matchRoles(roles: string[], userRoles: any[]) {
    if (roles.find((f) => userRoles.find((u) => f == u))) return true
    return false
  }
}
