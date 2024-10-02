import { Routes } from '@angular/router'
import { PresentationComponent } from './presentation/presentation.component'
import { NewsComponent } from './news/news.component'
import { ContactComponent } from './contact/contact.component'
import { ConnexionComponent } from './connexion/connexion.component'
import { DeconnexionComponent } from './deconnexion/deconnexion.component'

export const routes: Routes = [
    { path: '', redirectTo: '/presentation', pathMatch: 'full' },
    { path: 'presentation', component: PresentationComponent },
    { path: 'news', component: NewsComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'connexion', component: ConnexionComponent },
    { path: 'deconnexion', component: DeconnexionComponent },
    { path: '**', redirectTo: '/presentation' },
]
