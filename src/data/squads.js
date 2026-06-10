// build-20260610
// World Cup 2026 - Full squad lists by team
// Each player: { name, pos } where pos is FW | MF | DF | GK
// Ordered: FW first (most likely to score), then MF, then DF, then GK

export const SQUADS = {
  // Group A
  'Mexico': [
    { name: 'Raul Jimenez', pos: 'FW' }, { name: 'Santiago Gimenez', pos: 'FW' }, { name: 'Julian Quinones', pos: 'FW' }, { name: 'Alexis Vega', pos: 'FW' }, { name: 'Armando Gonzalez', pos: 'FW' }, { name: 'César Huerta', pos: 'FW' }, { name: 'Guillermo Martinez', pos: 'FW' },
    { name: 'Alvaro Fidalgo', pos: 'MF' }, { name: 'Brian Gutierrez', pos: 'MF' }, { name: 'Erik Lira', pos: 'MF' }, { name: 'Gilberto Mora', pos: 'MF' }, { name: 'Luis Romo', pos: 'MF' }, { name: 'Obed Vargas', pos: 'MF' }, { name: 'Orbelin Pineda', pos: 'MF' },
    { name: 'Edson Alvarez', pos: 'DF' }, { name: 'Israel Reyes', pos: 'DF' }, { name: 'Jesus Gallardo', pos: 'DF' }, { name: 'Johan Vasquez', pos: 'DF' }, { name: 'Jorge Sanchez', pos: 'DF' }, { name: 'Mateo Chavez', pos: 'DF' },
    { name: 'Guillermo Ochoa', pos: 'GK' }, { name: 'Luis Malagon', pos: 'GK' },
  ],
  'South Africa': [
    { name: 'Lyle Foster', pos: 'FW' }, { name: 'Evidence Makgopa', pos: 'FW' }, { name: 'Oswin Appollis', pos: 'FW' }, { name: 'Iqraam Rayners', pos: 'FW' }, { name: 'Relebohile Mofokeng', pos: 'FW' }, { name: 'Thapelo Maseko', pos: 'FW' }, { name: 'Tshepang Moremi', pos: 'FW' },
    { name: 'Teboho Mokoena', pos: 'MF' }, { name: 'Sphephelo Sithole', pos: 'MF' }, { name: 'Thalente Mbatha', pos: 'MF' }, { name: 'Jayden Adams', pos: 'MF' }, { name: 'Themba Zwane', pos: 'MF' },
    { name: 'Aubrey Modiba', pos: 'DF' }, { name: 'Khuliso Mudau', pos: 'DF' }, { name: 'Nkosinathi Sibisi', pos: 'DF' }, { name: 'Mbekezeli Mbokazi', pos: 'DF' }, { name: 'Ime Okon', pos: 'DF' }, { name: 'Samukele Kabini', pos: 'DF' }, { name: 'Khulumani Ndamane', pos: 'DF' }, { name: 'Bradley Cross', pos: 'DF' },
    { name: 'Ronwen Williams', pos: 'GK' }, { name: 'Veli Mothwa', pos: 'GK' },
  ],
  'South Korea': [
    { name: 'Heung-Min Son', pos: 'FW' }, { name: 'Hyeon-Gyu Oh', pos: 'FW' }, { name: 'Gue-Sung Cho', pos: 'FW' }, { name: 'Hee-Chan Hwang', pos: 'FW' },
    { name: 'Kang-In Lee', pos: 'MF' }, { name: 'Dong-Gyeong Lee', pos: 'MF' }, { name: 'Jae-Sung Lee', pos: 'MF' }, { name: 'In-Beom Hwang', pos: 'MF' }, { name: 'Jin-Gyu Kim', pos: 'MF' }, { name: 'Jun-Ho Bae', pos: 'MF' }, { name: 'Seung-Ho Paik', pos: 'MF' }, { name: 'Hyun-Jun Yang', pos: 'MF' }, { name: 'Ji-Sung Eom', pos: 'MF' },
    { name: 'Moon-Hwan Kim', pos: 'DF' }, { name: 'Min-Jae Kim', pos: 'DF' }, { name: 'Tae-Hyon Kim', pos: 'DF' }, { name: 'Jin-Seob Park', pos: 'DF' }, { name: 'Young-Woo Seol', pos: 'DF' }, { name: 'Jens Castrop', pos: 'DF' }, { name: 'Ki-Hyuk Lee', pos: 'DF' }, { name: 'Yu-Min Cho', pos: 'DF' },
    { name: 'Seung-Gyu Kim', pos: 'GK' }, { name: 'Jo Hyeon-Woo', pos: 'GK' },
  ],
  'Czech Republic': [
    { name: 'Adam Hlozek', pos: 'FW' }, { name: 'Tomas Chory', pos: 'FW' }, { name: 'Mojmir Chytil', pos: 'FW' }, { name: 'Jan Kuchta', pos: 'FW' }, { name: 'Patrik Schick', pos: 'FW' },
    { name: 'Lukas Cerv', pos: 'MF' }, { name: 'Vladimir Darida', pos: 'MF' }, { name: 'Lukas Provod', pos: 'MF' }, { name: 'Michal Sadilek', pos: 'MF' }, { name: 'Hugo Sochurek', pos: 'MF' }, { name: 'Tomas Soucek', pos: 'MF' }, { name: 'Pavel Sulc', pos: 'MF' },
    { name: 'Vladimir Coufal', pos: 'DF' }, { name: 'David Doudera', pos: 'DF' }, { name: 'Tomas Holes', pos: 'DF' }, { name: 'Robin Hranac', pos: 'DF' }, { name: 'David Jurasek', pos: 'DF' }, { name: 'Ladislav Krejci', pos: 'DF' }, { name: 'David Zima', pos: 'DF' },
    { name: 'Tomas Vaclik', pos: 'GK' }, { name: 'Jindrich Stanek', pos: 'GK' },
  ],
  // Group B
  'Canada': [
    { name: 'Jonathan David', pos: 'FW' }, { name: 'Cyle Larin', pos: 'FW' }, { name: 'Tani Oluwaseyi', pos: 'FW' }, { name: 'Promise David', pos: 'FW' },
    { name: 'Tajon Buchanan', pos: 'MF' }, { name: 'Stephen Eustaquio', pos: 'MF' }, { name: 'Ismael Kone', pos: 'MF' }, { name: 'Jonathan Osorio', pos: 'MF' }, { name: 'Jacob Shaffelburg', pos: 'MF' }, { name: 'Liam Millar', pos: 'MF' }, { name: 'Mathieu Choiniere', pos: 'MF' }, { name: 'Marcelo Flores', pos: 'MF' },
    { name: 'Alphonso Davies', pos: 'DF' }, { name: 'Moise Bombito', pos: 'DF' }, { name: 'Derek Cornelius', pos: 'DF' }, { name: 'Alistair Johnston', pos: 'DF' }, { name: 'Richie Laryea', pos: 'DF' }, { name: 'Joel Waterman', pos: 'DF' }, { name: 'Niko Sigur', pos: 'DF' },
    { name: 'Maxime Crepeau', pos: 'GK' }, { name: 'Milan Borjan', pos: 'GK' },
  ],
  'Bosnia-Herzegovina': [
    { name: 'Edin Dzeko', pos: 'FW' }, { name: 'Ermedin Demirovic', pos: 'FW' }, { name: 'Haris Tabakovic', pos: 'FW' }, { name: 'Esmir Bajraktarevic', pos: 'FW' },
    { name: 'Amir Hadziahmetovic', pos: 'MF' }, { name: 'Ivan Sunjic', pos: 'MF' }, { name: 'Benjamin Tahirovic', pos: 'MF' }, { name: 'Dzenis Burnic', pos: 'MF' }, { name: 'Kerim Alajbegovic', pos: 'MF' }, { name: 'Ivan Basic', pos: 'MF' }, { name: 'Ermin Mahmic', pos: 'MF' },
    { name: 'Sead Kolasinac', pos: 'DF' }, { name: 'Amar Dedic', pos: 'DF' }, { name: 'Nikola Katic', pos: 'DF' }, { name: 'Tarik Muharemovic', pos: 'DF' }, { name: 'Dennis Hadzikadunic', pos: 'DF' }, { name: 'Stjepan Radeljic', pos: 'DF' },
    { name: 'Kenan Piric', pos: 'GK' }, { name: 'Ibrahim Sehic', pos: 'GK' },
  ],
  'Qatar': [
    { name: 'Almoez Ali', pos: 'FW' }, { name: 'Akram Afif', pos: 'FW' }, { name: 'Mohammed Muntari', pos: 'FW' }, { name: 'Edmilson Junior', pos: 'FW' }, { name: 'Ahmed Al-Janahi', pos: 'FW' },
    { name: 'Hassan Al-Haydos', pos: 'MF' }, { name: 'Mohammed Al-Manai', pos: 'MF' }, { name: 'Karim Boudiaf', pos: 'MF' }, { name: 'Assim Madibo', pos: 'MF' }, { name: 'Abdulaziz Hatem', pos: 'MF' }, { name: 'Jassem Jaber', pos: 'MF' },
    { name: 'Hashmi Hussein', pos: 'DF' }, { name: 'Ayoub Alawi', pos: 'DF' }, { name: 'Boualem Khoukhi', pos: 'DF' }, { name: 'Pedro Miguel', pos: 'DF' }, { name: 'Lucas Mendes', pos: 'DF' }, { name: 'Sultan Al-Brake', pos: 'DF' },
    { name: 'Meshaal Barsham', pos: 'GK' }, { name: 'Yousuf Hassan', pos: 'GK' },
  ],
  'Switzerland': [
    { name: 'Breel Embolo', pos: 'FW' }, { name: 'Zeki Amdouni', pos: 'FW' }, { name: 'Noah Okafor', pos: 'FW' }, { name: 'Dan Ndoye', pos: 'FW' }, { name: 'Cedric Itten', pos: 'FW' },
    { name: 'Granit Xhaka', pos: 'MF' }, { name: 'Remo Freuler', pos: 'MF' }, { name: 'Ardon Jashari', pos: 'MF' }, { name: 'Fabian Rieder', pos: 'MF' }, { name: 'Djibril Sow', pos: 'MF' }, { name: 'Ruben Vargas', pos: 'MF' }, { name: 'Christian Fassnacht', pos: 'MF' }, { name: 'Denis Zakaria', pos: 'MF' },
    { name: 'Manuel Akanji', pos: 'DF' }, { name: 'Nico Elvedi', pos: 'DF' }, { name: 'Ricardo Rodriguez', pos: 'DF' }, { name: 'Silvan Widmer', pos: 'DF' }, { name: 'Eray Comert', pos: 'DF' }, { name: 'Miro Muheim', pos: 'DF' },
    { name: 'Yann Sommer', pos: 'GK' }, { name: 'Gregor Kobel', pos: 'GK' },
  ],
  // Group C
  'Brazil': [
    { name: 'Vinicius Jr', pos: 'FW' }, { name: 'Rodrygo', pos: 'FW' }, { name: 'Raphinha', pos: 'FW' }, { name: 'Gabriel Martinelli', pos: 'FW' }, { name: 'Endrick', pos: 'FW' }, { name: 'Luiz Henrique', pos: 'FW' },
    { name: 'Lucas Paqueta', pos: 'MF' }, { name: 'Gerson', pos: 'MF' }, { name: 'Bruno Guimaraes', pos: 'MF' }, { name: 'Andreas Pereira', pos: 'MF' }, { name: 'Joao Gomes', pos: 'MF' }, { name: 'Guimaraes', pos: 'MF' },
    { name: 'Marquinhos', pos: 'DF' }, { name: 'Thiago Silva', pos: 'DF' }, { name: 'Danilo', pos: 'DF' }, { name: 'Alex Sandro', pos: 'DF' }, { name: 'Militao', pos: 'DF' }, { name: 'Ibañez', pos: 'DF' }, { name: 'Guilherme Arana', pos: 'DF' },
    { name: 'Alisson', pos: 'GK' }, { name: 'Ederson', pos: 'GK' },
  ],
  'Morocco': [
    { name: 'Youssef En-Nesyri', pos: 'FW' }, { name: 'Soufiane Rahimi', pos: 'FW' }, { name: 'Ayoub El Kaabi', pos: 'FW' }, { name: 'Abdessamad Ezzalzouli', pos: 'FW' },
    { name: 'Hakim Ziyech', pos: 'MF' }, { name: 'Azzedine Ounahi', pos: 'MF' }, { name: 'Selim Amallah', pos: 'MF' }, { name: 'Bilal El Khannouss', pos: 'MF' }, { name: 'Sofyan Amrabat', pos: 'MF' }, { name: 'Ilias Chair', pos: 'MF' },
    { name: 'Achraf Hakimi', pos: 'DF' }, { name: 'Romain Saiss', pos: 'DF' }, { name: 'Nayef Aguerd', pos: 'DF' }, { name: 'Jawad El Yamiq', pos: 'DF' }, { name: 'Yahia Attiat-Allah', pos: 'DF' }, { name: 'Noussair Mazraoui', pos: 'DF' },
    { name: 'Yassine Bounou', pos: 'GK' }, { name: 'Munir Mohamedi', pos: 'GK' },
  ],
  'Scotland': [
    { name: 'Lyndon Dykes', pos: 'FW' }, { name: 'Lawrence Shankland', pos: 'FW' }, { name: 'Che Adams', pos: 'FW' }, { name: 'Ryan Christie', pos: 'FW' },
    { name: 'John McGinn', pos: 'MF' }, { name: 'Stuart Armstrong', pos: 'MF' }, { name: 'Billy Gilmour', pos: 'MF' }, { name: 'Ryan Jack', pos: 'MF' }, { name: 'Kenny McLean', pos: 'MF' }, { name: 'Scott McTominay', pos: 'MF' },
    { name: 'Andrew Robertson', pos: 'DF' }, { name: 'Kieran Tierney', pos: 'DF' }, { name: 'Grant Hanley', pos: 'DF' }, { name: 'Jack Hendry', pos: 'DF' }, { name: 'Liam Cooper', pos: 'DF' }, { name: 'Anthony Ralston', pos: 'DF' },
    { name: 'Craig Gordon', pos: 'GK' }, { name: 'Angus Gunn', pos: 'GK' },
  ],
  'Haiti': [
    { name: 'Frantzdy Pierrot', pos: 'FW' }, { name: 'Duckens Nazon', pos: 'FW' }, { name: 'Kevin Lafrance', pos: 'FW' }, { name: 'Carnejy Antoine', pos: 'FW' },
    { name: 'Derrick Etienne', pos: 'MF' }, { name: 'Wilde-Donald Guerrier', pos: 'MF' }, { name: 'Herve Bazile', pos: 'MF' }, { name: 'Steeven Saba', pos: 'MF' },
    { name: 'Joel Cantave', pos: 'DF' }, { name: 'Mechack Jerome', pos: 'DF' }, { name: 'Frederic Gua', pos: 'DF' }, { name: 'Andrew Jean-Baptiste', pos: 'DF' },
    { name: 'Josue Duverger', pos: 'GK' }, { name: 'Jonathan Lesellier', pos: 'GK' },
  ],
  // Group D
  'United States': [
    { name: 'Christian Pulisic', pos: 'FW' }, { name: 'Ricardo Pepi', pos: 'FW' }, { name: 'Josh Sargent', pos: 'FW' }, { name: 'Folarin Balogun', pos: 'FW' }, { name: 'Tim Weah', pos: 'FW' },
    { name: 'Gio Reyna', pos: 'MF' }, { name: 'Yunus Musah', pos: 'MF' }, { name: 'Tyler Adams', pos: 'MF' }, { name: 'Weston McKennie', pos: 'MF' }, { name: 'Malik Tillman', pos: 'MF' }, { name: 'Luca de la Torre', pos: 'MF' },
    { name: 'Sergiño Dest', pos: 'DF' }, { name: 'Joe Scally', pos: 'DF' }, { name: 'Miles Robinson', pos: 'DF' }, { name: 'Chris Richards', pos: 'DF' }, { name: 'Tim Ream', pos: 'DF' }, { name: 'Cameron Carter-Vickers', pos: 'DF' },
    { name: 'Matt Turner', pos: 'GK' }, { name: 'Patrick Schulte', pos: 'GK' },
  ],
  'Paraguay': [
    { name: 'Miguel Almiron', pos: 'FW' }, { name: 'Antonio Sanabria', pos: 'FW' }, { name: 'Julio Enciso', pos: 'FW' }, { name: 'Robert Morales', pos: 'FW' },
    { name: 'Matias Villasanti', pos: 'MF' }, { name: 'Andres Cubas', pos: 'MF' }, { name: 'Jorge Morel', pos: 'MF' }, { name: 'Damian Bobadilla', pos: 'MF' },
    { name: 'Junior Alonso', pos: 'DF' }, { name: 'Gustavo Velazquez', pos: 'DF' }, { name: 'Omar Alderete', pos: 'DF' }, { name: 'Alberto Espinola', pos: 'DF' }, { name: 'Fabian Balbuena', pos: 'DF' },
    { name: 'Antony Silva', pos: 'GK' }, { name: 'Roberto Fernandez', pos: 'GK' },
  ],
  'Australia': [
    { name: 'Mathew Leckie', pos: 'FW' }, { name: 'Mitchell Duke', pos: 'FW' }, { name: 'Jason Cummings', pos: 'FW' }, { name: 'Garang Kuol', pos: 'FW' },
    { name: 'Tom Rogic', pos: 'MF' }, { name: 'Jackson Irvine', pos: 'MF' }, { name: 'Aaron Mooy', pos: 'MF' }, { name: 'Riley McGree', pos: 'MF' }, { name: 'Keanu Baccus', pos: 'MF' }, { name: 'Connor Metcalfe', pos: 'MF' },
    { name: 'Aziz Behich', pos: 'DF' }, { name: 'Milos Degenek', pos: 'DF' }, { name: 'Harry Souttar', pos: 'DF' }, { name: 'Nathaniel Atkinson', pos: 'DF' }, { name: 'Joel King', pos: 'DF' }, { name: 'Kye Rowles', pos: 'DF' },
    { name: 'Mat Ryan', pos: 'GK' }, { name: 'Joe Gauci', pos: 'GK' },
  ],
  'Turkey': [
    { name: 'Kerem Akturkoglu', pos: 'FW' }, { name: 'Baris Alper Yilmaz', pos: 'FW' }, { name: 'Enes Unal', pos: 'FW' }, { name: 'Semih Kilicsoy', pos: 'FW' }, { name: 'Yunus Akgun', pos: 'FW' },
    { name: 'Hakan Calhanoglu', pos: 'MF' }, { name: 'Samet Akaydin', pos: 'MF' }, { name: 'Okay Yokuslu', pos: 'MF' }, { name: 'Ismail Yuksek', pos: 'MF' }, { name: 'Orkun Kokcu', pos: 'MF' },
    { name: 'Zeki Celik', pos: 'DF' }, { name: 'Merih Demiral', pos: 'DF' }, { name: 'Kaan Ayhan', pos: 'DF' }, { name: 'Abdulkerim Bardakci', pos: 'DF' }, { name: 'Ferdi Kadioglu', pos: 'DF' },
    { name: 'Ugurcan Cakir', pos: 'GK' }, { name: 'Mert Gunok', pos: 'GK' },
  ],
  // Group E
  'Germany': [
    { name: 'Kai Havertz', pos: 'FW' }, { name: 'Niclas Fullkrug', pos: 'FW' }, { name: 'Leroy Sane', pos: 'FW' }, { name: 'Florian Wirtz', pos: 'FW' }, { name: 'Jamal Musiala', pos: 'FW' }, { name: 'Thomas Muller', pos: 'FW' },
    { name: 'Leon Goretzka', pos: 'MF' }, { name: 'Joshua Kimmich', pos: 'MF' }, { name: 'Ilkay Gundogan', pos: 'MF' }, { name: 'Toni Kroos', pos: 'MF' }, { name: 'Chris Fuhrich', pos: 'MF' },
    { name: 'Antonio Rudiger', pos: 'DF' }, { name: 'Jonathan Tah', pos: 'DF' }, { name: 'Robin Gosens', pos: 'DF' }, { name: 'Benjamin Henrichs', pos: 'DF' }, { name: 'Maximilian Mittelstadt', pos: 'DF' }, { name: 'Waldemar Anton', pos: 'DF' },
    { name: 'Manuel Neuer', pos: 'GK' }, { name: 'Marc-Andre ter Stegen', pos: 'GK' },
  ],
  'Ivory Coast': [
    { name: 'Sebastien Haller', pos: 'FW' }, { name: 'Nicolas Pepe', pos: 'FW' }, { name: 'Simon Adingra', pos: 'FW' }, { name: 'Wilfried Zaha', pos: 'FW' }, { name: 'Jonathan Bamba', pos: 'FW' },
    { name: 'Franck Kessie', pos: 'MF' }, { name: 'Jean-Michael Seri', pos: 'MF' }, { name: 'Seko Fofana', pos: 'MF' }, { name: 'Ismael Traore', pos: 'MF' },
    { name: 'Serge Aurier', pos: 'DF' }, { name: 'Wilfried Singo', pos: 'DF' }, { name: 'Odilon Kossounou', pos: 'DF' }, { name: 'Eric Bailly', pos: 'DF' }, { name: 'Ghislain Konan', pos: 'DF' },
    { name: 'Yahia Fofana', pos: 'GK' }, { name: 'Badra Ali Sangare', pos: 'GK' },
  ],
  'Ecuador': [
    { name: 'Enner Valencia', pos: 'FW' }, { name: 'Michael Estrada', pos: 'FW' }, { name: 'Kevin Rodriguez', pos: 'FW' }, { name: 'Jordy Caicedo', pos: 'FW' },
    { name: 'Moises Caicedo', pos: 'MF' }, { name: 'Jhegson Mendez', pos: 'MF' }, { name: 'Jeremy Sarmiento', pos: 'MF' }, { name: 'Gonzalo Plata', pos: 'MF' }, { name: 'Alan Minda', pos: 'MF' },
    { name: 'Felix Torres', pos: 'DF' }, { name: 'Piero Hincapie', pos: 'DF' }, { name: 'Angelo Preciado', pos: 'DF' }, { name: 'Pervis Estupinan', pos: 'DF' }, { name: 'Diego Palacios', pos: 'DF' },
    { name: 'Hernan Galindez', pos: 'GK' }, { name: 'Alexander Dominguez', pos: 'GK' },
  ],
  'Curaçao': [
    { name: 'Cuco Martina', pos: 'FW' }, { name: 'Jurien Gaari', pos: 'FW' }, { name: 'Elson Hooi', pos: 'FW' }, { name: 'Leandro Bacuna', pos: 'FW' },
    { name: 'Rangelo Janga', pos: 'MF' }, { name: 'Etienne Reijnen', pos: 'MF' }, { name: 'Furdjel Narsingh', pos: 'MF' }, { name: 'Quentin Beerens', pos: 'MF' },
    { name: 'Giliano Wijnaldum', pos: 'DF' }, { name: 'Ruishmar Smeekes', pos: 'DF' }, { name: 'Vurnon Anita', pos: 'DF' }, { name: 'Steffan Poulain', pos: 'DF' },
    { name: 'Eloy Room', pos: 'GK' }, { name: 'Garfield Wright', pos: 'GK' },
  ],
  // Group F
  'Sweden': [
    { name: 'Zlatan Ibrahimovic', pos: 'FW' }, { name: 'Alexander Isak', pos: 'FW' }, { name: 'Viktor Gyokeres', pos: 'FW' }, { name: 'Dejan Kulusevski', pos: 'FW' }, { name: 'Emil Forsberg', pos: 'FW' },
    { name: 'Albin Ekdal', pos: 'MF' }, { name: 'Gustav Svensson', pos: 'MF' }, { name: 'Mattias Svanberg', pos: 'MF' }, { name: 'Kristoffer Olsson', pos: 'MF' },
    { name: 'Ludwig Augustinsson', pos: 'DF' }, { name: 'Mikael Lustig', pos: 'DF' }, { name: 'Victor Lindelof', pos: 'DF' }, { name: 'Marcus Danielson', pos: 'DF' }, { name: 'Pontus Jansson', pos: 'DF' },
    { name: 'Robin Olsen', pos: 'GK' }, { name: 'Karl-Johan Johnsson', pos: 'GK' },
  ],
  'Tunisia': [
    { name: 'Wahbi Khazri', pos: 'FW' }, { name: 'Taha Yassine Khenissi', pos: 'FW' }, { name: 'Seifeddine Jaziri', pos: 'FW' }, { name: 'Naim Sliti', pos: 'FW' },
    { name: 'Ghailene Chaalali', pos: 'MF' }, { name: 'Anis Ben Slimane', pos: 'MF' }, { name: 'Ellyes Skhiri', pos: 'MF' }, { name: 'Mohamed Ali Ben Romdhane', pos: 'MF' },
    { name: 'Yassine Meriah', pos: 'DF' }, { name: 'Ali Maaloul', pos: 'DF' }, { name: 'Dylan Bronn', pos: 'DF' }, { name: 'Montassar Talbi', pos: 'DF' }, { name: 'Wajdi Kechrida', pos: 'DF' },
    { name: 'Aymen Dahmen', pos: 'GK' }, { name: 'Bechir Ben Said', pos: 'GK' },
  ],
  'Netherlands': [
    { name: 'Memphis Depay', pos: 'FW' }, { name: 'Wout Weghorst', pos: 'FW' }, { name: 'Cody Gakpo', pos: 'FW' }, { name: 'Donyell Malen', pos: 'FW' }, { name: 'Noa Lang', pos: 'FW' },
    { name: 'Frenkie de Jong', pos: 'MF' }, { name: 'Georginio Wijnaldum', pos: 'MF' }, { name: 'Davy Klaassen', pos: 'MF' }, { name: 'Tijjani Reijnders', pos: 'MF' }, { name: 'Xavi Simons', pos: 'MF' },
    { name: 'Virgil van Dijk', pos: 'DF' }, { name: 'Matthijs de Ligt', pos: 'DF' }, { name: 'Denzel Dumfries', pos: 'DF' }, { name: 'Daley Blind', pos: 'DF' }, { name: 'Nathan Ake', pos: 'DF' }, { name: 'Jeremie Frimpong', pos: 'DF' },
    { name: 'Andries Noppert', pos: 'GK' }, { name: 'Mark Flekken', pos: 'GK' },
  ],
  'Japan': [
    { name: 'Takumi Minamino', pos: 'FW' }, { name: 'Kaoru Mitoma', pos: 'FW' }, { name: 'Ayase Ueda', pos: 'FW' }, { name: 'Ritsu Doan', pos: 'FW' }, { name: 'Junya Ito', pos: 'FW' },
    { name: 'Wataru Endo', pos: 'MF' }, { name: 'Ao Tanaka', pos: 'MF' }, { name: 'Daichi Kamada', pos: 'MF' }, { name: 'Hidemasa Morita', pos: 'MF' }, { name: 'Yuki Soma', pos: 'MF' },
    { name: 'Maya Yoshida', pos: 'DF' }, { name: 'Ko Itakura', pos: 'DF' }, { name: 'Hiroki Sakai', pos: 'DF' }, { name: 'Yuto Nagatomo', pos: 'DF' }, { name: 'Takehiro Tomiyasu', pos: 'DF' },
    { name: 'Shuichi Gonda', pos: 'GK' }, { name: 'Zion Suzuki', pos: 'GK' },
  ],
  // Group G
  'Belgium': [
    { name: 'Romelu Lukaku', pos: 'FW' }, { name: 'Dries Mertens', pos: 'FW' }, { name: 'Lois Openda', pos: 'FW' }, { name: 'Jeremy Doku', pos: 'FW' }, { name: 'Leandro Trossard', pos: 'FW' },
    { name: 'Kevin De Bruyne', pos: 'MF' }, { name: 'Axel Witsel', pos: 'MF' }, { name: 'Youri Tielemans', pos: 'MF' }, { name: 'Amadou Onana', pos: 'MF' }, { name: 'Arthur Vermeeren', pos: 'MF' },
    { name: 'Jan Vertonghen', pos: 'DF' }, { name: 'Toby Alderweireld', pos: 'DF' }, { name: 'Thomas Meunier', pos: 'DF' }, { name: 'Timothy Castagne', pos: 'DF' }, { name: 'Wout Faes', pos: 'DF' },
    { name: 'Thibaut Courtois', pos: 'GK' }, { name: 'Koen Casteels', pos: 'GK' },
  ],
  'Egypt': [
    { name: 'Mohamed Salah', pos: 'FW' }, { name: 'Mostafa Mohamed', pos: 'FW' }, { name: 'Marwan Hamdy', pos: 'FW' }, { name: 'Omar Marmoush', pos: 'FW' },
    { name: 'Tarek Hamed', pos: 'MF' }, { name: 'Emam Ashour', pos: 'MF' }, { name: 'Trezeguet', pos: 'MF' }, { name: 'Mohamed Elneny', pos: 'MF' }, { name: 'Amr El Sulaya', pos: 'MF' },
    { name: 'Ahmed Hegazy', pos: 'DF' }, { name: 'Omar Kamal', pos: 'DF' }, { name: 'Akram Tawfik', pos: 'DF' }, { name: 'Mohamed Abdelmonem', pos: 'DF' }, { name: 'Ahmed Fattouh', pos: 'DF' },
    { name: 'Mohamed El Shenawy', pos: 'GK' }, { name: 'Mohamed Abou Gabal', pos: 'GK' },
  ],
  'Spain': [
    { name: 'Alvaro Morata', pos: 'FW' }, { name: 'Mikel Oyarzabal', pos: 'FW' }, { name: 'Ferran Torres', pos: 'FW' }, { name: 'Dani Olmo', pos: 'FW' }, { name: 'Nico Williams', pos: 'FW' }, { name: 'Lamine Yamal', pos: 'FW' },
    { name: 'Pedri', pos: 'MF' }, { name: 'Gavi', pos: 'MF' }, { name: 'Fabian Ruiz', pos: 'MF' }, { name: 'Rodri', pos: 'MF' }, { name: 'Mikel Merino', pos: 'MF' },
    { name: 'Dani Carvajal', pos: 'DF' }, { name: 'Alejandro Balde', pos: 'DF' }, { name: 'Pau Cubarsi', pos: 'DF' }, { name: 'Robin Le Normand', pos: 'DF' }, { name: 'Nacho Fernandez', pos: 'DF' },
    { name: 'Unai Simon', pos: 'GK' }, { name: 'David Raya', pos: 'GK' },
  ],
  'Cape Verde': [
    { name: 'Julio Tavares', pos: 'FW' }, { name: 'Ryan Mendes', pos: 'FW' }, { name: 'Garry Rodrigues', pos: 'FW' }, { name: 'Jovane Cabral', pos: 'FW' },
    { name: 'Andrelinho', pos: 'MF' }, { name: 'Patrick Andrade', pos: 'MF' }, { name: 'Jamiro Monteiro', pos: 'MF' }, { name: 'Kenny Rocha', pos: 'MF' },
    { name: 'Roberto Lopes', pos: 'DF' }, { name: 'Dylan Tavares', pos: 'DF' }, { name: 'Stopira', pos: 'DF' }, { name: 'Efigénio', pos: 'DF' },
    { name: 'Vozinha', pos: 'GK' }, { name: 'Kevin Lopes', pos: 'GK' },
  ],
  // Group H
  'Saudi Arabia': [
    { name: 'Salem Al-Dawsari', pos: 'FW' }, { name: 'Firas Al-Buraikan', pos: 'FW' }, { name: 'Abdullah Al-Hamdan', pos: 'FW' }, { name: 'Haitham Asiri', pos: 'FW' },
    { name: 'Mohammed Al-Qasem', pos: 'MF' }, { name: 'Sami Al-Najei', pos: 'MF' }, { name: 'Saleh Al-Shehri', pos: 'MF' }, { name: 'Nasser Al-Dawsari', pos: 'MF' },
    { name: 'Saud Abdulhamid', pos: 'DF' }, { name: 'Ali Al-Bulaihi', pos: 'DF' }, { name: 'Hassan Tambakti', pos: 'DF' }, { name: 'Abdullah Madu', pos: 'DF' },
    { name: 'Mohammed Al-Owais', pos: 'GK' }, { name: 'Nawaf Al-Aqidi', pos: 'GK' },
  ],
  'Uruguay': [
    { name: 'Luis Suarez', pos: 'FW' }, { name: 'Darwin Nunez', pos: 'FW' }, { name: 'Facundo Pellistri', pos: 'FW' }, { name: 'Maximiliano Gomez', pos: 'FW' }, { name: 'Agustin Canobbio', pos: 'FW' },
    { name: 'Federico Valverde', pos: 'MF' }, { name: 'Rodrigo Bentancur', pos: 'MF' }, { name: 'Matias Vecino', pos: 'MF' }, { name: 'Manuel Ugarte', pos: 'MF' }, { name: 'Lucas Torreira', pos: 'MF' },
    { name: 'Diego Godin', pos: 'DF' }, { name: 'Jose Gimenez', pos: 'DF' }, { name: 'Ronald Araujo', pos: 'DF' }, { name: 'Matias Vina', pos: 'DF' }, { name: 'Martin Caceres', pos: 'DF' },
    { name: 'Fernando Muslera', pos: 'GK' }, { name: 'Sebastian Sosa', pos: 'GK' },
  ],
  'Iran': [
    { name: 'Sardar Azmoun', pos: 'FW' }, { name: 'Mehdi Taremi', pos: 'FW' }, { name: 'Karim Ansarifard', pos: 'FW' }, { name: 'Allahyar Sayyadmanesh', pos: 'FW' },
    { name: 'Alireza Jahanbakhsh', pos: 'MF' }, { name: 'Ali Gholizadeh', pos: 'MF' }, { name: 'Saeid Ezatolahi', pos: 'MF' }, { name: 'Ahmad Noorollahi', pos: 'MF' },
    { name: 'Shojae Khalilzadeh', pos: 'DF' }, { name: 'Ehsan Hajsafi', pos: 'DF' }, { name: 'Majid Hosseini', pos: 'DF' }, { name: 'Milad Mohammadi', pos: 'DF' },
    { name: 'Alireza Beiranvand', pos: 'GK' }, { name: 'Hossein Hosseini', pos: 'GK' },
  ],
  'New Zealand': [
    { name: 'Chris Wood', pos: 'FW' }, { name: 'Liberato Cacace', pos: 'FW' }, { name: 'Elijah Just', pos: 'FW' }, { name: 'Hamish Watson', pos: 'FW' },
    { name: 'Clayton Lewis', pos: 'MF' }, { name: 'Joe Bell', pos: 'MF' }, { name: 'Marko Stamenic', pos: 'MF' }, { name: 'Alex Rufer', pos: 'MF' },
    { name: 'Winston Reid', pos: 'DF' }, { name: 'Tommy Smith', pos: 'DF' }, { name: 'Tim Payne', pos: 'DF' }, { name: 'Nando Pijnaker', pos: 'DF' },
    { name: 'Stefan Marinovic', pos: 'GK' }, { name: 'Michael Woud', pos: 'GK' },
  ],
  // Group I
  'France': [
    { name: 'Kylian Mbappe', pos: 'FW' }, { name: 'Olivier Giroud', pos: 'FW' }, { name: 'Ousmane Dembele', pos: 'FW' }, { name: 'Marcus Thuram', pos: 'FW' }, { name: 'Kingsley Coman', pos: 'FW' }, { name: 'Randal Kolo Muani', pos: 'FW' },
    { name: 'Antoine Griezmann', pos: 'MF' }, { name: 'Aurelien Tchouameni', pos: 'MF' }, { name: 'Adrien Rabiot', pos: 'MF' }, { name: 'Eduardo Camavinga', pos: 'MF' }, { name: 'Youssouf Fofana', pos: 'MF' },
    { name: 'Jules Kounde', pos: 'DF' }, { name: 'Dayot Upamecano', pos: 'DF' }, { name: 'William Saliba', pos: 'DF' }, { name: 'Theo Hernandez', pos: 'DF' }, { name: 'Benjamin Pavard', pos: 'DF' },
    { name: 'Mike Maignan', pos: 'GK' }, { name: 'Alphonse Areola', pos: 'GK' },
  ],
  'Senegal': [
    { name: 'Sadio Mane', pos: 'FW' }, { name: 'Ismaila Sarr', pos: 'FW' }, { name: 'Boulaye Dia', pos: 'FW' }, { name: 'Nicolas Jackson', pos: 'FW' }, { name: 'Iliman Ndiaye', pos: 'FW' },
    { name: 'Idrissa Gueye', pos: 'MF' }, { name: 'Cheikhou Kouyate', pos: 'MF' }, { name: 'Pape Matar Sarr', pos: 'MF' }, { name: 'Nampalys Mendy', pos: 'MF' },
    { name: 'Kalidou Koulibaly', pos: 'DF' }, { name: 'Youssouf Sabaly', pos: 'DF' }, { name: 'Formose Mendy', pos: 'DF' }, { name: 'Ismail Jakobs', pos: 'DF' }, { name: 'Abdou Diallo', pos: 'DF' },
    { name: 'Edouard Mendy', pos: 'GK' }, { name: 'Alfred Gomis', pos: 'GK' },
  ],
  'Iraq': [
    { name: 'Mohanad Ali', pos: 'FW' }, { name: 'Aymen Hussein', pos: 'FW' }, { name: 'Aziz Karim', pos: 'FW' }, { name: 'Ali Adnan', pos: 'FW' },
    { name: 'Amjad Atwan', pos: 'MF' }, { name: 'Safaa Hadi', pos: 'MF' }, { name: 'Bashar Resan', pos: 'MF' }, { name: 'Osama Rashid', pos: 'MF' },
    { name: 'Hussein Ali', pos: 'DF' }, { name: 'Ali Hamza', pos: 'DF' }, { name: 'Rebin Sulaka', pos: 'DF' }, { name: 'Ahmed Ibrahim', pos: 'DF' },
    { name: 'Jalal Hassan', pos: 'GK' }, { name: 'Mohammed Hameed', pos: 'GK' },
  ],
  'Norway': [
    { name: 'Erling Haaland', pos: 'FW' }, { name: 'Alexander Sorloth', pos: 'FW' }, { name: 'Mohamed Elyounoussi', pos: 'FW' }, { name: 'Ola Solbakken', pos: 'FW' },
    { name: 'Martin Odegaard', pos: 'MF' }, { name: 'Sander Berge', pos: 'MF' }, { name: 'Fredrik Aursnes', pos: 'MF' }, { name: 'Morten Thorsby', pos: 'MF' }, { name: 'Kristian Thorstvedt', pos: 'MF' },
    { name: 'Kristoffer Ajer', pos: 'DF' }, { name: 'Leo Ostigard', pos: 'DF' }, { name: 'Birger Meling', pos: 'DF' }, { name: 'Julian Ryerson', pos: 'DF' }, { name: 'Andreas Hanche-Olsen', pos: 'DF' },
    { name: 'Orjan Nyland', pos: 'GK' }, { name: 'Ørjan Nyland', pos: 'GK' },
  ],
  // Group J
  'Argentina': [
    { name: 'Lionel Messi', pos: 'FW' }, { name: 'Lautaro Martinez', pos: 'FW' }, { name: 'Julian Alvarez', pos: 'FW' }, { name: 'Angel Di Maria', pos: 'FW' }, { name: 'Paulo Dybala', pos: 'FW' },
    { name: 'Rodrigo De Paul', pos: 'MF' }, { name: 'Enzo Fernandez', pos: 'MF' }, { name: 'Leandro Paredes', pos: 'MF' }, { name: 'Alexis Mac Allister', pos: 'MF' }, { name: 'Giovani Lo Celso', pos: 'MF' },
    { name: 'Lisandro Martinez', pos: 'DF' }, { name: 'Cristian Romero', pos: 'DF' }, { name: 'Nicolas Otamendi', pos: 'DF' }, { name: 'Nicolas Tagliafico', pos: 'DF' }, { name: 'Nahuel Molina', pos: 'DF' },
    { name: 'Emiliano Martinez', pos: 'GK' }, { name: 'Geronimo Rulli', pos: 'GK' },
  ],
  'Algeria': [
    { name: 'Islam Slimani', pos: 'FW' }, { name: 'Youcef Belaili', pos: 'FW' }, { name: 'Baghdad Bounedjah', pos: 'FW' }, { name: 'Riyad Mahrez', pos: 'FW' }, { name: 'Said Benrahma', pos: 'FW' },
    { name: 'Sofiane Feghouli', pos: 'MF' }, { name: 'Ismail Bennacer', pos: 'MF' }, { name: 'Nabil Bentaleb', pos: 'MF' }, { name: 'Ramiz Zerrouki', pos: 'MF' },
    { name: 'Aissa Mandi', pos: 'DF' }, { name: 'Rami Bensebaini', pos: 'DF' }, { name: 'Djamel Benlamri', pos: 'DF' }, { name: 'Youcef Atal', pos: 'DF' },
    { name: 'Rais M\'bolhi', pos: 'GK' }, { name: 'Alexandre Oukidja', pos: 'GK' },
  ],
  'Austria': [
    { name: 'Marko Arnautovic', pos: 'FW' }, { name: 'Michael Gregoritsch', pos: 'FW' }, { name: 'Sasa Kalajdzic', pos: 'FW' }, { name: 'Patrick Wimmer', pos: 'FW' },
    { name: 'Marcel Sabitzer', pos: 'MF' }, { name: 'Konrad Laimer', pos: 'MF' }, { name: 'Nicolas Seiwald', pos: 'MF' }, { name: 'Florian Grillitsch', pos: 'MF' }, { name: 'Xaver Schlager', pos: 'MF' },
    { name: 'David Alaba', pos: 'DF' }, { name: 'Stefan Posch', pos: 'DF' }, { name: 'Philipp Lienhart', pos: 'DF' }, { name: 'Gernot Trauner', pos: 'DF' }, { name: 'Maximilian Wober', pos: 'DF' },
    { name: 'Patrick Pentz', pos: 'GK' }, { name: 'Daniel Bachmann', pos: 'GK' },
  ],
  'Jordan': [
    { name: 'Yazan Al-Naimat', pos: 'FW' }, { name: 'Mohammad Abu Zema', pos: 'FW' }, { name: 'Ahmad Hayel', pos: 'FW' }, { name: 'Hamza Al-Dardour', pos: 'FW' },
    { name: 'Musa Al-Taamari', pos: 'MF' }, { name: 'Saleh Hardani', pos: 'MF' }, { name: 'Ahmad Yusuf', pos: 'MF' }, { name: 'Baha Faisal', pos: 'MF' },
    { name: 'Noor Al-Rawabdeh', pos: 'DF' }, { name: 'Osama Rashid', pos: 'DF' }, { name: 'Yazan Al-Arab', pos: 'DF' }, { name: 'Abdullah Nasib', pos: 'DF' },
    { name: 'Yazid Jarrad', pos: 'GK' }, { name: 'Amer Shafi', pos: 'GK' },
  ],
  // Group K
  'Portugal': [
    { name: 'Cristiano Ronaldo', pos: 'FW' }, { name: 'Goncalo Ramos', pos: 'FW' }, { name: 'Rafael Leao', pos: 'FW' }, { name: 'Joao Felix', pos: 'FW' }, { name: 'Pedro Neto', pos: 'FW' }, { name: 'Diogo Jota', pos: 'FW' },
    { name: 'Bruno Fernandes', pos: 'MF' }, { name: 'Bernardo Silva', pos: 'MF' }, { name: 'Vitinha', pos: 'MF' }, { name: 'Ruben Neves', pos: 'MF' }, { name: 'Joao Neves', pos: 'MF' },
    { name: 'Joao Cancelo', pos: 'DF' }, { name: 'Ruben Dias', pos: 'DF' }, { name: 'Pepe', pos: 'DF' }, { name: 'Nuno Mendes', pos: 'DF' }, { name: 'Diogo Dalot', pos: 'DF' },
    { name: 'Diogo Costa', pos: 'GK' }, { name: 'Rui Patricio', pos: 'GK' },
  ],
  'Uzbekistan': [
    { name: 'Eldor Shomurodov', pos: 'FW' }, { name: 'Abbosbek Fayzullaev', pos: 'FW' }, { name: 'Dostonbek Khamdamov', pos: 'FW' }, { name: 'Sherzod Nasrullayev', pos: 'FW' },
    { name: 'Otabek Shukurov', pos: 'MF' }, { name: 'Jaloliddin Masharipov', pos: 'MF' }, { name: 'Bobur Abdixoliqov', pos: 'MF' }, { name: 'Odiljon Hamrobekov', pos: 'MF' },
    { name: 'Oybek Sobirov', pos: 'DF' }, { name: 'Umid Ahmedov', pos: 'DF' }, { name: 'Jamshid Iskanderov', pos: 'DF' }, { name: 'Islom Tukhtahujaev', pos: 'DF' },
    { name: 'Utkir Yusupov', pos: 'GK' }, { name: 'Oybek Dzhalilov', pos: 'GK' },
  ],
  'Congo DR': [
    { name: 'Cédric Bakambu', pos: 'FW' }, { name: 'Yannick Bolasie', pos: 'FW' }, { name: 'Jonathan Bolingi', pos: 'FW' }, { name: 'Théo Bongonda', pos: 'FW' },
    { name: 'Chancel Mbemba', pos: 'MF' }, { name: 'Neeskens Kebano', pos: 'MF' }, { name: 'Samuel Bastien', pos: 'MF' }, { name: 'Dylan Mbuy', pos: 'MF' },
    { name: 'Gaël Kakuta', pos: 'DF' }, { name: 'Marcel Tisserand', pos: 'DF' }, { name: 'Merveille Bongonda', pos: 'DF' }, { name: 'Arthur Masuaku', pos: 'DF' },
    { name: 'Ley Matampi', pos: 'GK' }, { name: 'Joel Kiassumbua', pos: 'GK' },
  ],
  // Group L
  'England': [
    { name: 'Harry Kane', pos: 'FW' }, { name: 'Marcus Rashford', pos: 'FW' }, { name: 'Bukayo Saka', pos: 'FW' }, { name: 'Phil Foden', pos: 'FW' }, { name: 'Raheem Sterling', pos: 'FW' }, { name: 'Ollie Watkins', pos: 'FW' },
    { name: 'Jude Bellingham', pos: 'MF' }, { name: 'Declan Rice', pos: 'MF' }, { name: 'Kobbie Mainoo', pos: 'MF' }, { name: 'Conor Gallagher', pos: 'MF' }, { name: 'Curtis Jones', pos: 'MF' },
    { name: 'Trent Alexander-Arnold', pos: 'DF' }, { name: 'Luke Shaw', pos: 'DF' }, { name: 'John Stones', pos: 'DF' }, { name: 'Marc Guehi', pos: 'DF' }, { name: 'Kyle Walker', pos: 'DF' },
    { name: 'Jordan Pickford', pos: 'GK' }, { name: 'Aaron Ramsdale', pos: 'GK' },
  ],
  'Croatia': [
    { name: 'Ivan Perisic', pos: 'FW' }, { name: 'Andrej Kramaric', pos: 'FW' }, { name: 'Bruno Petkovic', pos: 'FW' }, { name: 'Luka Ivanusec', pos: 'FW' },
    { name: 'Luka Modric', pos: 'MF' }, { name: 'Mateo Kovacic', pos: 'MF' }, { name: 'Marcelo Brozovic', pos: 'MF' }, { name: 'Mario Pasalic', pos: 'MF' }, { name: 'Lovro Majer', pos: 'MF' },
    { name: 'Josko Gvardiol', pos: 'DF' }, { name: 'Josip Stanisic', pos: 'DF' }, { name: 'Dejan Lovren', pos: 'DF' }, { name: 'Josip Juranovic', pos: 'DF' }, { name: 'Borna Sosa', pos: 'DF' },
    { name: 'Dominik Livakovic', pos: 'GK' }, { name: 'Ivica Ivusic', pos: 'GK' },
  ],
  'Ghana': [
    { name: 'Jordan Ayew', pos: 'FW' }, { name: 'Antoine Semenyo', pos: 'FW' }, { name: 'Inaki Williams', pos: 'FW' }, { name: 'Osman Bukari', pos: 'FW' }, { name: 'Felix Afena-Gyan', pos: 'FW' },
    { name: 'Thomas Partey', pos: 'MF' }, { name: 'Mohammed Kudus', pos: 'MF' }, { name: 'Daniel Kofi Kyereh', pos: 'MF' }, { name: 'Andre Ayew', pos: 'MF' }, { name: 'Iddrisu Baba', pos: 'MF' },
    { name: 'Daniel Amartey', pos: 'DF' }, { name: 'Alexander Djiku', pos: 'DF' }, { name: 'Tariq Lamptey', pos: 'DF' }, { name: 'Abdul Rahman Baba', pos: 'DF' }, { name: 'Jonathan Mensah', pos: 'DF' },
    { name: 'Lawrence Ati Zigi', pos: 'GK' }, { name: 'Jojo Wollacott', pos: 'GK' },
  ],
  'Panama': [
    { name: 'Rolando Blackburn', pos: 'FW' }, { name: 'Edgar Barcenas', pos: 'FW' }, { name: 'Jose Fajardo', pos: 'FW' }, { name: 'Cecilio Waterman', pos: 'FW' },
    { name: 'Andres Andrade', pos: 'MF' }, { name: 'Alberto Quintero', pos: 'MF' }, { name: 'Anibal Godoy', pos: 'MF' }, { name: 'Adalberto Carrasquilla', pos: 'MF' },
    { name: 'Ricardo Avila', pos: 'DF' }, { name: 'Eric Davis', pos: 'DF' }, { name: 'Harold Cummings', pos: 'DF' }, { name: 'Roderick Miller', pos: 'DF' }, { name: 'Michael Murillo', pos: 'DF' },
    { name: 'Orlando Mosquera', pos: 'GK' }, { name: 'Luis Mejia', pos: 'GK' },
  ],
  // Additional group teams
  'Colombia': [
    { name: 'Luis Diaz', pos: 'FW' }, { name: 'Rafael Santos Borre', pos: 'FW' }, { name: 'Jhon Cordoba', pos: 'FW' }, { name: 'Cucho Hernandez', pos: 'FW' },
    { name: 'James Rodriguez', pos: 'MF' }, { name: 'Juan Cuadrado', pos: 'MF' }, { name: 'Wilmar Barrios', pos: 'MF' }, { name: 'Mateus Uribe', pos: 'MF' }, { name: 'Richard Rios', pos: 'MF' },
    { name: 'Santiago Arias', pos: 'DF' }, { name: 'Davinson Sanchez', pos: 'DF' }, { name: 'Jhon Lucumi', pos: 'DF' }, { name: 'William Tesillo', pos: 'DF' }, { name: 'Daniel Munoz', pos: 'DF' },
    { name: 'Camilo Vargas', pos: 'GK' }, { name: 'David Ospina', pos: 'GK' },
  ],
};

// Helper to get all players for a team, ordered FW > MF > DF > GK
export function getSquadOrdered(team) {
  const players = SQUADS[team] || [];
  const order = { FW: 0, MF: 1, DF: 2, GK: 3 };
  return [...players].sort((a, b) => order[a.pos] - order[b.pos]);
}

// Helper to get player names only (backward compat)
export function getPlayerNames(team) {
  return (SQUADS[team] || []).map(p => p.name);
}
