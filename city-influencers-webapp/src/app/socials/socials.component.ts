import { Component, Input, OnInit } from '@angular/core';
import { Platform } from '../platform';
import { PlatformAccount } from '../platformAccount';
import { Role } from '../Role';
import { User } from '../user';

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.scss']
})
export class SocialsComponent implements OnInit {

  role: Role = {
    roleId: 3,
    roleName: 'influencer'
  }

  @Input() influencer: User = {
    userId: 0,
    firstName: '',
    surname: '',
    isActive: false,
    dateOfBirth: '',
    aboutMe: '',
    profilePicture: '',
    phoneNumber: '',
    gender: '',
    email: '',
    password: '',
    token: '',
    roleId: 0,
    role: this.role
  }

  @Input() platform: Platform = {
    platformId: 0,
    name: ''
  }

  @Input() platformAccount: PlatformAccount = {
    accountId: 0,
    userId: 0,
    platformId: 0,
    username: '',
    user: this.influencer,
    platform: this.platform
  }

  constructor() { }

  ngOnInit(): void {
  }

}
