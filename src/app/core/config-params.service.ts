import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ConfigPrams } from '../shared/models/config-prams';

@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {

  constructor() { }

  /*uitlizamos o   httpParams.set para colocar os parâmetro que vão para o backend, passano o nome do parâmetro e o valor*/
  configurarParametros(config: ConfigPrams): HttpParams {
    let httpParams = new HttpParams();
    if (config.pagina) {
      httpParams = httpParams.set('_page', config.pagina.toString());
    }
    if (config.limite) {
      httpParams = httpParams.set('_limit', config.limite.toString());
    }
    if (config.pesquisa) {
      httpParams = httpParams.set('q', config.pesquisa);
    }
    if (config.campo) {
      httpParams = httpParams.set(config.campo.tipo, config.campo.valor.toString());
    }
    httpParams = httpParams.set('_sort', 'id');//para listar ordenado, dos mais recentes para os mais antigos
    httpParams = httpParams.set('_order', 'desc');

    return httpParams;
  }
}
