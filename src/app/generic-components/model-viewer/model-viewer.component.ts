import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit, SimpleChange, SimpleChanges
} from '@angular/core';
import { CharacterState } from '../../store/state/character.state';
import { Store } from '@ngrx/store';
import { CharacterAssetsService } from '../../pw/ui/game/character/character-assets.service';
import { Character } from '../../pw/infrastructure/character/Character';
import { getCharacter } from '../../store/selectors/character.selector';
import { BaseComponent } from '../../utils/base-component';
import { debounceTime } from 'rxjs/operators';
import { FaIcon } from '../fa-icon.enum';

@Component({
  selector: 'pw-model-viewer',
  templateUrl: './model-viewer.component.html',
  styleUrls: ['./model-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelViewerComponent implements OnChanges {

  @Input()
  character: Character;

  @Input()
  height = 256;

  sources: { src: string; loaded: boolean; }[] = [];

  loading = true;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private characterAssetsService: CharacterAssetsService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.character && changes.character.currentValue) {
      this.setSources(this.character);
    }
  }

  private setSources(character: Character): void {
    this.sources = [
      { src: this.characterAssetsService.getSkin(character), loaded: false },
      { src: this.characterAssetsService.getEyes(character), loaded: false },
      { src: this.characterAssetsService.getNose(character), loaded: false },
      { src: this.characterAssetsService.getEars(character), loaded: false },
      { src: this.characterAssetsService.getHair(character), loaded: false },
      { src: this.characterAssetsService.getTorso(character), loaded: false },
      { src: this.characterAssetsService.getLegs(character), loaded: false },
      { src: this.characterAssetsService.getShoes(character), loaded: false },
      { src: this.characterAssetsService.getWeapon(character), loaded: false }
    ];
  }

  imageLoaded(src: string): void {
    this.sources.find(value => value.src === src).loaded = true;
    this.loading = this.sources.some(value => value.src && !value.loaded);
    this.changeDetectorRef.detectChanges();
  }
}
