import {Injectable} from '@angular/core';
import {HotToastService} from '@ngneat/hot-toast';
import {interval} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly toastMessages: string[] = [
    'سُبْحَانَ اللَّهِ',
    'الْحَمْدُ لِلَّهِ',
    'اللَّهُ أَكْبَرُ',
    'لَا إِلَٰهَ إِلَّا اللَّهُ',
    'أَسْتَغْفِرُ اللَّهَ',
    'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ',
    'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
    'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    'رَضِيتُ بِاللَّهِ رَبًّا وَبِالْإِسْلَامِ دِينًا وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    'لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا',
    'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
    'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ',
    'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
    'يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
    'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',
    'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
    'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحُزْنِ وَالْعَجْزِ وَالْكَسَلِ وَالْبُخْلِ وَالْجُبْنِ وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
  ];

  constructor(private toast: HotToastService) {
    setTimeout(() => {
      this.init();
    }, 6000)
  }

  private init() {
    this.showRandomToast();

    interval(30000).subscribe(() => {
      this.showRandomToast();
    });
  }

  private getRandomMessage(): string {
    const randomIndex = Math.floor(Math.random() * this.toastMessages.length);
    return this.toastMessages[randomIndex];
  }

  private showToast(message: string): void {
    this.toast.close()
    this.toast.info(message, {duration: 10000, theme: "snackbar"});
  }

  private showRandomToast(): void {
    const randomMessage = this.getRandomMessage();
    this.showToast(randomMessage);
  }
}
