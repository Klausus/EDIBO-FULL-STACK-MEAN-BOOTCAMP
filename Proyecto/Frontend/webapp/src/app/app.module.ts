// DEPENDENCIES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// PROVIDERS (SERVICES)
import { HTTP } from './httpclient';
import { BoardService } from './board/board.service';
import { ColumnService } from './column/column.service';
import { CardService } from './card/card.service';
// import { WebSocketService } from './ws.service';

// COMPONENTS
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoardComponent } from './board/board.component';
import { ColumnComponent } from './column/column.component';
import { CardComponent } from './card/card.component';

// PIPES
// import { OrderBy } from './pipes/orderby.pipe';
// import { Where } from './pipes/where.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    BoardComponent,
    CardComponent,
    ColumnComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [HTTP, BoardService, ColumnService, CardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
