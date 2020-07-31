import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment'



export class LancamentoFilter {
    descricao : string;
    dataVencimentoInicio : Date;
    dataVencimentoFim : Date ;
    pagina = 0;
    itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosURL = 'http://localhost:8080/lancamentos';

  constructor(private http:HttpClient) {  }

  pesquisar(filtro : LancamentoFilter): Promise<any> {
    
    let params = new HttpParams(); // parâmnetros de pesquisa da URL
    const headers = new HttpHeaders().append('Authorization', 
    'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBybHNwbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTk4NjI2NjgzLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIyMjYyMGY0Zi00MWZkLTRjODItODUyMS02NTdiNmIwODI0ODYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.t-bN3Rbfk_bFsChzjuT5hJb2ZWxdz1YqhZkKIS4tlzs');
    //const headers = new HttpHeaders().append('Authorization', 'Basic YW5ndWxhcjpAYW5ndWxAcjA=');

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString())

    if (typeof filtro.descricao !== 'undefined' && filtro.descricao.length > 0) {
      params = params.set('descricao', filtro.descricao);// atribui filtro.descricao para dentro de 'descricao'
      }

    if (filtro.dataVencimentoInicio) {
        params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }
    
    if (filtro.dataVencimentoFim) {
        params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }
    
    return this.http.get(`${this.lancamentosURL}?resumo`, { headers, params })
        .toPromise()
        .then(response => {
          const lancamentos = response['content'];
          const resultado = {
            lancamentos,
            total: response['totalElements']
          }
          return resultado;
        })
      
  }


  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', 
    'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBybHNwbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTk4NjI2NjgzLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIyMjYyMGY0Zi00MWZkLTRjODItODUyMS02NTdiNmIwODI0ODYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.t-bN3Rbfk_bFsChzjuT5hJb2ZWxdz1YqhZkKIS4tlzs');

    return this.http.delete(`${this.lancamentosURL}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

}