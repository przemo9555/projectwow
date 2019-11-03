import { Injectable } from '@angular/core';
import { CharacterService } from '../../services/api/character.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { CharacterActionsTypes, GetCharacterFail, GetCharacterSuccess } from '../actions/character.action';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class CharacterEffect {
  constructor(private characterService: CharacterService,
              private actions$: Actions,
              private router: Router) { }

  @Effect()
  getCharacter: Observable<Action> = this.actions$.pipe(
    ofType(CharacterActionsTypes.GetCharacter),
    mergeMap(() => this.characterService.getCharacter().pipe(
      map(character => {
        if (!character) { this.router.navigate(['/character/new']); }
        return new GetCharacterSuccess(character);
      }),
      catchError(err => of(new GetCharacterFail(err)))
    )));
}
