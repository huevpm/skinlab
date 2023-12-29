// Từ hàng 1 tới hàng 5 k thấy trong clip của t
import {AppComponent} from './app.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {RouterModule, Routes} from '@angular/router';
import { HeaderComponent} from 'shared/header/header.component';
import { FooterComponent} from 'shared/footer/footer.component';
import { ProductsModule} from '@bluebits/products';
import { UiModule} from '@bluebits/ui';
import { AccordionModule} from 'primeng/accordion';
import { NavComponent } from 'shared/nav/nav.component';
import {HttpClientModule} from '@angular/common/http';
import { OrdersModule } from '@bluebits/orders';




const routes: Routes = [{ path: '', component: HomePageComponent}]

@NgModule({
    declarations: [AppComponent, HomePageComponent, HeaderComponent]
    import: [
        BrowserModule,
        RouterModule.forRoot(routes).
        HttpClientModule,
        ProductsModule,
        AccordionModule,
        BrowserAnimationModule,
        UiModule,
        OrdersModule
    ],
    providers: [],
    bootstrap: [AppComponent]

})
export class AppModule {}
// Khúc dưới file này k thấy trong vid