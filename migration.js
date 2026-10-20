const db = require("./db") 

const ESTRUTURA_CLIENTE = `
      DROP TABLE IF EXISTS Cliente;
      CREATE TABLE Cliente (
        id int NOT NULL AUTO_INCREMENT,
        nome varchar(50) NOT NULL,
        cpf char(14) NOT NULL,
        celular char(14) NOT NULL,
        email varchar(50) NOT NULL,
        senha varchar(512) NOT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY cpf (cpf),
        UNIQUE KEY email (email)
      ) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
  `
const DADOS_CLIENTE = `
      INSERT INTO Cliente VALUES 
      (12,'Deh','45687126305','12365322587','teste@gmail.com','$2b$10$bPZvgQKCIjIHgC.LZ74A3e9KCdpfqHrecFLvt3ABXVxM3HF.TEUx.'),
      (13,'Mario souza','12345678900','41963254785','mario@gmail.com','$2b$10$sVuJe4F5fnFKZflxBitgwek.l2UgHErABxYReq20Rs.Mx380KjdcK'),
      (14,'Karl Marx','78945612300','119852414521','karlmarx@gmail.com','$2b$10$ZhvIESs4oY/dDKvwiPIacOyohznM30wbcSu5xneHeTGfZXY7B4qCK');

`
const ESTRUTURA_PRODUTO = `
      DROP TABLE IF EXISTS Produto;
      CREATE TABLE Produto (
        id int NOT NULL AUTO_INCREMENT,
        nome varchar(80) NOT NULL,
        descricao varchar(200) NOT NULL,
        categoria varchar(80) NOT NULL,
        preco varchar(50) NOT NULL,
        caminho_img varchar(200) DEFAULT '/fotos/semfoto.png',
        quantidade_img int DEFAULT '1',
        PRIMARY KEY (id)
      ) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4;
`
const DADOS_PRODUTO = `
      INSERT INTO Produto VALUES 
      (1,'Dom Casmurro','Clássico da literatura brasileira escrito por Machado de Assis. Publicado em 1899. Contém 256 páginas.','Literatura Brasileira','39.90','/fotos/dom_casmurro.png',1),
      (2,'1984','Romance distópico clássico sobre controle totalitário por George Orwell. Publicado em 1949. Contém 416 páginas.','Ficção Científica','45.00','/fotos/1984.png',1),
      (3,'O Senhor dos Anéis: A Sociedade do Anel','Primeiro volume da épica saga de fantasia criada por J.R.R. Tolkien. Publicado em 1954. Contém 576 páginas.','Fantasia','59.90','/fotos/senhor_dos_aneis_1.png',1),
      (4,'O Pequeno Príncipe','Fábula poética sobre amizade e amor de Antoine de Saint-Exupéry. Publicada em 1943. Contém 96 páginas.','Infantojuvenil','29.90','/fotos/pequeno_principe.png',1),
      (5,'Orgulho e Preconceito','Romance clássico focado nas relações da sociedade inglesa por Jane Austen. Publicado em 1813. Contém 424 páginas.','Romance','34.90','/fotos/orgulho_preconceito.png',1),
      (6,'A Revolução dos Bichos','Sátira política marcante sobre poder e corrupção por George Orwell. Publicada em 1945. Contém 152 páginas.','Ficção Científica','25.00','/fotos/revolucao_bichos.png',1),
      (7,'O Hobbit','A jornada de Bilbo Bolseiro em busca do tesouro dos anões por J.R.R. Tolkien. Publicado em 1937. Contém 336 páginas.','Fantasia','49.90','/fotos/o_hobbit.png',1),
      (8,'Cem Anos de Solidão','Obra-prima do realismo mágico escrita por Gabriel García Márquez. Publicada em 1967. Contém 448 páginas.','Ficção','64.90','/fotos/cem_anos_solidao.png',1),
      (9,'A Hora da Estrela','Romance marcante sobre a vida da nordestina Macabéa por Clarice Lispector. Publicado em 1977. Contém 88 páginas.','Literatura Brasileira','32.00','/fotos/hora_da_estrela.png',1),
      (10,'O Alquimista','Jornada espiritual e inspiradora escrita por Paulo Coelho. Publicada em 1988. Contém 208 páginas.','Autoajuda','39.90','/fotos/o_alquimista.png',1),
      (11,'Duna','Epopeia sci-fi no planeta desértico Arrakis escrita por Frank Herbert. Publicada em 1965. Contém 680 páginas.','Ficção Científica','69.90','/fotos/duna.png',1),
      (12,'Harry Potter e a Pedra Filosofal','O início da jornada do bruxo garoto escrita por J.K. Rowling. Publicado em 1997. Contém 224 páginas.','Fantasia','44.90','/fotos/hp_pedra_filosofal.png',1),
      (13,'O Apanhador no Campo de Centeio','Busca por identidade na juventude escrita por J.D. Salinger. Publicado em 1951. Contém 240 páginas.','Ficção','38.00','/fotos/apanhador_centeio.png',1),
      (14,'O Sol é Para Todos','Clássico sobre justiça e preconceito no sul dos EUA por Harper Lee. Publicado em 1960. Contém 352 páginas.','Ficção','42.90','/fotos/sol_para_todos.png',1),
      (15,'Sapiens: Uma Breve História da Humanidade','Análise sobre a evolução humana escrita por Yuval Noah Harari. Publicado em 2011. Contém 464 páginas.','História','59.00','/fotos/sapiens.png',1),
      (16,'O Código Da Vinci','Enigma e mistério envolvendo a história da arte por Dan Brown. Publicado em 2003. Contém 432 páginas.','Suspense','49.90','/fotos/codigo_da_vinci.png',1),
      (17,'A Menina que Roubava Livros','História de Liesel na Segunda Guerra narrada pela Morte por Markus Zusak. Publicada em 2005. Contém 480 páginas.','Drama','39.90','/fotos/menina_roubava_livros.png',1),
      (18,'Fahrenheit 451','Distopia em que os livros são proibidos e queimados por Ray Bradbury. Publicada em 1953. Contém 216 páginas.','Ficção Científica','36.90','/fotos/fahrenheit_451.png',1),
      (19,'O Silmarillion','As lendas e mitos primordiais da Terra-média por J.R.R. Tolkien. Publicado em 1977. Contém 480 páginas.','Fantasia','54.90','/fotos/silmarillion.png',1),
      (20,'Memórias Póstumas de Brás Cubas','Inovador romance narrado por um defunto autor por Machado de Assis. Publicado em 1881. Contém 224 páginas.','Literatura Brasileira','31.90','/fotos/bras_cubas.png',1),
      (21,'O Iluminado','Clássico do terror psicológico no Hotel Overlook por Stephen King. Publicado em 1977. Contém 520 páginas.','Terror','52.00','/fotos/o_iluminado.png',1),
      (22,'Grande Sertão: Veredas','Obra monumental da literatura nacional escrita por Guimarães Rosa. Publicada em 1956. Contém 608 páginas.','Literatura Brasileira','74.90','/fotos/grande_sertao.png',1),
      (23,'O Diário de Anne Frank','Relato real do esconderijo de Anne Frank durante a guerra. Publicado em 1947. Contém 352 páginas.','Biografia','35.00','/fotos/diario_anne_frank.png',1),
      (24,'Admirável Mundo Novo','Sociedade futurista controlada por tecnologia descrita por Aldous Huxley. Publicado em 1932. Contém 312 páginas.','Ficção Científica','41.90','/fotos/admiravel_mundo_novo.png',1),
      (25,'O Conde de Monte Cristo','Épico conto de traição e vingança escrito por Alexandre Dumas. Publicado em 1844. Contém 1376 páginas.','Aventura','89.90','/fotos/conde_monte_cristo.png',1),
      (26,'Crime e Castigo','Profundo estudo psicológico sobre culpa e redenção por Fiódor Dostoiévski. Publicado em 1866. Contém 592 páginas.','Literatura Clássica','58.00','/fotos/crime_e_castigo.png',1),
      (27,'O Retrato de Dorian Gray','Obra sobre vaidade, arte e moralidade escrita por Oscar Wilde. Publicada em 1890. Contém 240 páginas.','Literatura Clássica','36.00','/fotos/dorian_gray.png',1),
      (28,'Moby Dick','A obsessiva caçada à grande baleia branca por Herman Melville. Publicado em 1851. Contém 656 páginas.','Aventura','62.00','/fotos/moby_dick.png',1),
      (29,'A Metamorfose','A estranha transformação de Gregor Samsa descrita por Franz Kafka. Publicada em 1915. Contém 96 páginas.','Ficção','28.00','/fotos/metamorfose.png',1),
      (30,'O Nome da Rosa','Investigação policial num mosteiro medieval escrita por Umberto Eco. Publicado em 1980. Contém 560 páginas.','Suspense','59.90','/fotos/nome_da_rosa.png',1),
      (31,'Ensaio sobre a Cegueira','Aterrorizante metáfora sobre a condição humana escrita por José Saramago. Publicado em 1995. Contém 312 páginas.','Literatura Portuguesa','48.00','/fotos/ensaio_cegueira.png',1),
      (32,'O Cortiço','Obra naturalista brasileira sobre as habitações coletivas por Aluísio Azevedo. Publicado em 1890. Contém 272 páginas.','Literatura Brasileira','29.90','/fotos/o_cortico.png',1),
      (33,'Capitães da Areia','A vida de garotos de rua em Salvador escrita por Jorge Amado. Publicado em 1937. Contém 280 páginas.','Literatura Brasileira','38.00','/fotos/capitaes_da_areia.png',1),
      (34,'Vidas Secas','A dura travessia da família de Fabiano no sertão por Graciliano Ramos. Publicado em 1938. Contém 176 páginas.','Literatura Brasileira','34.00','/fotos/vidas_secas.png',1),
      (35,'Triste Fim de Policarpo Quaresma','Sátira ao nacionalismo ufanista escrita por Lima Barreto. Publicado em 1915. Contém 240 páginas.','Literatura Brasileira','31.00','/fotos/policarpo_quaresma.png',1),
      (36,'Drácula','O clássico romance epistolar de vampiros escrito por Bram Stoker. Publicado em 1897. Contém 480 páginas.','Terror','44.90','/fotos/dracula.png',1),
      (37,'Frankenstein','A criação do monstro pelo cientista Victor Frankenstein por Mary Shelley. Publicado em 1818. Contém 240 páginas.','Terror','37.00','/fotos/frankenstein.png',1),
      (38,'Neuromancer','Obra fundadora do gênero cyberpunk escrita por William Gibson. Publicada em 1984. Contém 320 páginas.','Ficção Científica','46.00','/fotos/neuromancer.png',1),
      (39,'Fundação','O início da queda do Império Galáctico segundo Isaac Asimov. Publicado em 1951. Contém 288 páginas.','Ficção Científica','49.00','/fotos/fundacao.png',1),
      (40,'O Guia do Mochileiro das Galáxias','Clássica comédia espacial e ficção científica por Douglas Adams. Publicado em 1979. Contém 208 páginas.','Ficção Científica','39.90','/fotos/guia_mochileiro.png',1),
      (41,'Quarto de Despejo','Diário pungente de uma moradora da favela do Canindé por Carolina Maria de Jesus. Publicado em 1960. Contém 180 páginas.','Literatura Brasileira','35.90','/fotos/quarto_de_despejo.png',1),
      (42,'It: A Coisa','O terror palpável na cidade de Derry criado por Stephen King. Publicado em 1986. Contém 1104 páginas.','Terror','79.90','/fotos/it_a_coisa.png',1),
      (43,'A Cabana','Uma jornada de cura e fé diante da tragédia por William P. Young. Publicado em 2007. Contém 240 páginas.','Drama','39.90','/fotos/a_cabana.png',1),
      (44,'Jogos Vorazes','A luta pela sobrevivência em uma arena mortal por Suzanne Collins. Publicado em 2008. Contém 400 páginas.','Infantojuvenil','44.90','/fotos/jogos_vorazes.png',1),
      (45,'A culpa é das estrelas','Emocionante romance juvenil sobre amor e doença por John Green. Publicado em 2012. Contém 288 páginas.','Infantojuvenil','37.90','/fotos/culpa_estrelas.png',1),
      (46,'Pai Rico, Pai Pobre','Lições fundamentais sobre educação financeira por Robert Kiyosaki. Publicado em 1997. Contém 336 páginas.','Autoajuda','49.90','/fotos/pai_rico_pai_pobre.png',1),
      (47,'O Poder do Hábito','Como funcionam os hábitos na vida pessoal e profissional por Charles Duhigg. Publicado em 2012. Contém 408 páginas.','Autoajuda','54.90','/fotos/poder_do_habito.png',1),
      (48,'Mindset: A nova psicologia do sucesso','Como a mentalidade molda o nosso potencial por Carol S. Dweck. Publicado em 2006. Contém 312 páginas.','Autoajuda','45.00','/fotos/mindset.png',1),
      (49,'As Brumas de Avalon','A lenda do Rei Artur recontada pelo ponto de vista feminino por Marion Zimmer Bradley. Publicado em 1983. Contém 848 páginas.','Fantasia','69.90','/fotos/brumas_avalon.png',1),
      (50,'Percy Jackson e o Ladrão de Raios','A descoberta da mitologia grega no mundo moderno por Rick Riordan. Publicado em 2005. Contém 400 páginas.','Infantojuvenil','39.90','/fotos/percy_jackson.png',1),
      (51,'Boxe de Sombra','Histórias intensas e reflexivas da vida urbana. Publicado em 2010. Contém 150 páginas.','Ficção','29.90','/fotos/boxe_sombra.png',1),
      (52,'Star Wars: Herdeiro do Império','A continuação clássica da saga intergaláctica por Timothy Zahn. Publicado em 1991. Contém 416 páginas.','Ficção Científica','49.90','/fotos/star_wars_herdeiro.png',1),
      (53,'As Mil e Uma Noites','Contos tradicionais do Oriente Médio repletos de magia e mistério. Publicado em 1704. Contém 500 páginas.','Clássico','55.00','/fotos/mil_e_uma_noites.png',1),
      (54,'A Divina Comédia','A monumental jornada de Dante Alighieri pelo Inferno, Purgatório e Paraíso. Publicado em 1320. Contém 600 páginas.','Poesia Épica','65.00','/fotos/divina_comedia.png',1),
      (55,'Ilíada','O clássico épico sobre a Guerra de Troia escrito por Homero. Publicado em 800 a.C.. Contém 450 páginas.','Clássico','59.90','/fotos/iliada.png',1),
      (56,'Odisseia','As aventuras de Odisseu em seu retorno para casa por Homero. Publicado em 800 a.C.. Contém 430 páginas.','Clássico','59.90','/fotos/odisseia.png',1),
      (57,'Fausto','O pacto trágico entre o homem e Mefistófeles por Johann Wolfgang von Goethe. Publicado em 1808. Contém 320 páginas.','Literatura Clássica','42.00','/fotos/fausto.png',1),
      (58,'Guerra e Paz','O imenso afresco da sociedade russa durante as guerras napoleônicas por Lev Tolstói. Publicado em 1869. Contém 1224 páginas.','Literatura Clássica','89.90','/fotos/guerra_e_paz.png',1),
      (59,'Anna Kariênina','Trágico romance sobre amor adúltero na alta sociedade russa por Lev Tolstói. Publicado em 1878. Contém 800 páginas.','Literatura Clássica','69.90','/fotos/anna_karienina.png',1),
      (60,'Os Irmãos Karamazov','Último e profundo romance filosófico de Fiódor Dostoiévski. Publicado em 1880. Contém 900 páginas.','Literatura Clássica','79.90','/fotos/irmaos_karamazov.png',1),
      (61,'Noites Brancas','Delicado romance melancólico escrito por Fiódor Dostoiévski. Publicado em 1848. Contém 112 páginas.','Literatura Clássica','24.90','/fotos/noites_brancas.png',1),
      (62,'A Sangue Frio','Obra pioneira do jornalismo literário escrita por Truman Capote. Publicado em 1966. Contém 368 páginas.','Não Ficção','49.90','/fotos/a_sangue_frio.png',1),
      (63,'Bonequinha de Luxo','A famosa novela que inspirou o clássico do cinema por Truman Capote. Publicado em 1958. Contém 144 páginas.','Romance','29.90','/fotos/bonequinha_luxo.png',1),
      (64,'Breves Respostas para Grandes Questões','Últimas reflexões cosmológicas de Stephen Hawking. Publicado em 2018. Contém 256 páginas.','Ciência','44.90','/fotos/breves_respostas.png',1),
      (65,'Uma Breve História do Tempo','Os grandes mistérios do universo explicados por Stephen Hawking. Publicado em 1988. Contém 256 páginas.','Ciência','42.90','/fotos/breve_historia_tempo.png',1),
      (66,'O Mundo de Sofia','Uma jornada pela história da filosofia escrita por Jostein Gaarder. Publicado em 1991. Contém 550 páginas.','Filosofia','49.90','/fotos/mundo_de_sofia.png',1),
      (67,'A Arte da Guerra','Tratado clássico de estratégia militar atribuído a Sun Tzu. Publicado em 500 a.C.. Contém 160 páginas.','Filosofia','22.90','/fotos/arte_da_guerra.png',1),
      (68,'O Príncipe','Estudo clássico sobre poder político escrito por Maquiavel. Publicado em 1532. Contém 150 páginas.','Filosofia','24.90','/fotos/o_principe.png',1),
      (69,'Assim Falou Zaratustra','A monumental obra filosófica de Friedrich Nietzsche. Publicado em 1883. Contém 368 páginas.','Filosofia','45.00','/fotos/assim_falou_zaratustra.png',1),
      (70,'Crepúsculo','O fenômeno do romance sobrenatural entre vampiros e humanos por Stephenie Meyer. Publicado em 2005. Contém 400 páginas.','Romance','44.90','/fotos/crepusculo.png',1),
      (71,'A Seleção','Romance distópico e realismo fantástico juvenil por Kiera Cass. Publicado em 2012. Contém 368 páginas.','Infantojuvenil','39.90','/fotos/a_selecao.png',1),
      (72,'Cidades de Papel','Jornada de mistério e amadurecimento juvenil escrita por John Green. Publicado em 2008. Contém 368 páginas.','Infantojuvenil','37.90','/fotos/cidades_de_papel.png',1),
      (73,'Enquanto Agonizo','A complexa e fragmentada jornada de uma família no sul dos EUA por William Faulkner. Publicado em 1930. Contém 224 páginas.','Literatura Estrangeira','39.90','/fotos/enquanto_agonizo.png',1),
      (74,'O Velho e o Mar','A inesquecível luta de um pescador veterano por Ernest Hemingway. Publicado em 1952. Contém 128 páginas.','Literatura Estrangeira','32.00','/fotos/velho_e_o_mar.png',1),
      (75,'Por Quem os Sinos Dobram','Retrato marcante da Guerra Civil Espanhola por Ernest Hemingway. Publicado em 1940. Contém 480 páginas.','Literatura Estrangeira','52.00','/fotos/por_quem_os_sinos_dobram.png',1),
      (76,'O Solista','História real de redenção através da música por Steve Lopez. Publicado em 2008. Contém 304 páginas.','Biografia','38.00','/fotos/o_solista.png',1),
      (77,'Meditações','Reflexões pessoais sobre estoicismo do imperador Marco Aurélio. Publicado em 180 d.C.. Contém 176 páginas.','Filosofia','29.90','/fotos/meditacoes.png',1),
      (78,'Cartas a um Jovem Poeta','Conselhos profundos sobre arte e vida por Rainer Maria Rilke. Publicado em 1929. Contém 112 páginas.','Poesia','25.00','/fotos/cartas_jovem_poeta.png',1),
      (79,'O Profeta','Parábolas poéticas sobre a condição humana por Kahlil Gibran. Publicado em 1923. Contém 96 páginas.','Poesia','26.90','/fotos/o_profeta.png',1),
      (80,'Ensaio sobre a Liberdade','Clássico tratado político e filosófico por John Stuart Mill. Publicado em 1859. Contém 180 páginas.','Filosofia','34.90','/fotos/ensaio_sobre_liberdade.png',1);
`
async function criar_estrutura(){
  const connection = await db.pool.getConnection();
    try{
        await connection.beginTransaction();

        console.log("Criando tabela 'Cliente'...");
        await connection.query(ESTRUTURA_CLIENTE);
        await connection.query(DADOS_CLIENTE);

        console.log("Criando tabela 'Produto'...");
        await connection.query(ESTRUTURA_PRODUTO);
        await connection.query(DADOS_PRODUTO);

        await connection.commit();
        console.log("Migração de estrutura do bd finalizada.");
        process.exit(0);

    } catch(error){
        await connection.rollback();
        console.log(error);
        process.exit(1);
    } finally {
        connection.release();
    }
}

criar_estrutura()

//criar um banco de dados de teste e altera no arquivo db o nome do banco
