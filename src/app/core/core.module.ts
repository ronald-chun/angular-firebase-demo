import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { BaseHttpService } from './service/base.http.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    BaseHttpService,
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
    /// 可將這段拉出去建立一個ts檔案，未來需要指注入一次的module都可以使用
  }
}
