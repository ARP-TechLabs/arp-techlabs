import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { LoadingService } from './app/services/loading.service';
import { injectSpeedInsights } from '@vercel/speed-insights';
 
injectSpeedInsights({ sampleRate: 0.2 }); 

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [...(appConfig.providers || []), LoadingService],
}).catch((err) => console.error(err));
