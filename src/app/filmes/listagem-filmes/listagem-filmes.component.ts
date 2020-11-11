import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { debounceTime } from "rxjs/operators";
import { FilmesService } from "src/app/core/filmes.service";
import { Filme } from "src/app/shared/models/filme";
import { ConfigPrams } from "src/app/shared/models/config-prams";

@Component({
  selector: "dio-listagem-filmes",
  templateUrl: "./listagem-filmes.component.html",
  styleUrls: ["./listagem-filmes.component.scss"],
})
export class ListagemFilmesComponent implements OnInit {
  readonly semFoto =
    "https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg"; //readonly não dá para alterar o valor, é somente para leitura, como o nome diz.

  //Parâmetros para requisitar a api
  config: ConfigPrams = {
    pagina: 0,
    limite: 4,
  };

  //lista de filmes
  filmes: Filme[] = [];

  //Para listar por filtro
  filtrosListagem: FormGroup;
  generos: Array<string>;

  constructor(
    private filmesService: FilmesService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Para filtragem  de filmes
    this.filtrosListagem = this.fb.group({
      //campos do grupo do formulário
      texto: [""],
      genero: [""],
    });

    // Métodos de filtragem
    //Com o get, pegamos um campo do formulário, assim podemos trabalhar com os eventos por exemplo
    this.filtrosListagem
      .get("texto")
      .valueChanges.pipe(debounceTime(400)) //O debounceTime serve para executar UMA consulta por intervalo de tempo, aqui 400ms, mas precisamo usar ele dentro do pipe para realizar a operação
      .subscribe((val: string) => {
        this.config.pesquisa = val; //Adicionando o campo pesquisa na variável config, que vai para a requisição, devolvendo um lista por filtro
        this.resetarConsulta();
      });

    this.filtrosListagem.get("genero").valueChanges.subscribe((val: string) => {
      this.config.campo = { tipo: "genero", valor: val };
      this.resetarConsulta();
    });

    this.generos = [
      "Ação",
      "Romance",
      "Aventura",
      "Terror",
      "Ficção cientifica",
      "Comédia",
      "Aventura",
      "Drama",
    ];

    //Listando os filmes por filtro
    this.listarFilmes();
  }

  //Scroll infinito
  onScroll(): void {
    this.listarFilmes();
  }

  //Abrir filme
  abrir(id: number): void {
    this.router.navigateByUrl("/filmes/" + id);
  }

  private listarFilmes(): void {
    this.config.pagina++; //para o scroll => listagem por página
    this.filmesService
      .listar(this.config)
      .subscribe((filmes: Filme[]) => this.filmes.push(...filmes));
  }

  private resetarConsulta(): void {
    this.config.pagina = 0;
    this.filmes = [];
    this.listarFilmes();
  }
}
