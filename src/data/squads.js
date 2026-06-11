// build-20260611
// World Cup 2026 - Full squad lists by team
// Source: ESPN official confirmed squads (June 3 2026)
// Each player: { name, pos } where pos is FW | MF | DF | GK
// Ordered: FW first (most likely to score), then MF, then DF, then GK

export const SQUADS = {
  // Group A
  'Mexico': [
    { name: 'Armando Gonzalez', pos: 'F' }, { name: 'Raul Jimenez', pos: 'F' }, { name: 'Julian Quinones', pos: 'F' }, { name: 'Santiago Gimenez', pos: 'F' }, { name: 'Guillermo Martinez', pos: 'F' }, { name: 'Alexis Vega', pos: 'F' },
    { name: 'Gilberto Mora', pos: 'M' }, { name: 'Edson Alvarez', pos: 'M' }, { name: 'Orbelin Pineda', pos: 'M' }, { name: 'Luis Romo', pos: 'M' }, { name: 'Brian Gutierrez', pos: 'M' }, { name: 'Obed Vargas', pos: 'M' }, { name: 'Cesar Huerta', pos: 'M' }, { name: 'Luis Chavez', pos: 'M' }, { name: 'Erik Lira', pos: 'M' }, { name: 'Alvaro Fidalgo', pos: 'M' }, { name: 'Roberto Alvarado', pos: 'M' },
    { name: 'Jesus Gallardo', pos: 'D' }, { name: 'Israel Reyes', pos: 'D' }, { name: 'Cesar Montes', pos: 'D' }, { name: 'Jorge Sanchez', pos: 'D' }, { name: 'Johan Vasquez', pos: 'D' }, { name: 'Mateo Chavez', pos: 'D' },
    { name: 'Carlos Acevedo', pos: 'G' }, { name: 'Guillermo Ochoa', pos: 'G' }, { name: 'Raul Rangel', pos: 'G' },
  ],
  'South Africa': [
    { name: 'Oswin Appollis', pos: 'F' }, { name: 'Iqraam Rayners', pos: 'F' }, { name: 'Tshepang Moremi', pos: 'F' }, { name: 'Relebohile Mofokeng', pos: 'F' }, { name: 'Evidence Makgopa', pos: 'F' }, { name: 'Themba Zwane', pos: 'F' }, { name: 'Lyle Foster', pos: 'F' }, { name: 'Thapelo Maseko', pos: 'F' },
    { name: 'Teboho Mokoena', pos: 'M' }, { name: 'Thalente Mbatha', pos: 'M' }, { name: 'Sphephelo Sithole', pos: 'M' }, { name: 'Jayden Adams', pos: 'M' },
    { name: 'Khuliso Mudau', pos: 'D' }, { name: 'Nkosinathi Sibisi', pos: 'D' }, { name: 'Ime Okon', pos: 'D' }, { name: 'Khulumani Ndamane', pos: 'D' }, { name: 'Aubrey Modiba', pos: 'D' }, { name: 'Samukele Kabini', pos: 'D' }, { name: 'Thabang Matuludi', pos: 'D' }, { name: 'Olwethu Makhanya', pos: 'D' }, { name: 'Kamogelo Sebelebele', pos: 'D' }, { name: 'Bradley Cross', pos: 'D' }, { name: 'Mbekezeli Mbokazi', pos: 'D' },
    { name: 'Ronwen Williams', pos: 'G' }, { name: 'Ricardo Goss', pos: 'G' }, { name: 'Sipho Chaine', pos: 'G' },
  ],
  'South Korea': [
    { name: 'Oh Hyeon-gyu', pos: 'F' }, { name: 'Son Heung-min', pos: 'F' }, { name: 'Cho Gue-sung', pos: 'F' },
    { name: 'Yang Hyun-jun', pos: 'M' }, { name: 'Paik Seung-ho', pos: 'M' }, { name: 'Hwang In-beom', pos: 'M' }, { name: 'Kim Jin-gyu', pos: 'M' }, { name: 'Bae Jun-ho', pos: 'M' }, { name: 'Eom Ji-sung', pos: 'M' }, { name: 'Hwang Hee-chan', pos: 'M' }, { name: 'Lee Dong-gyeong', pos: 'M' }, { name: 'Lee Jae-sung', pos: 'M' }, { name: 'Lee Kang-in', pos: 'M' },
    { name: 'Kim Min-jae', pos: 'D' }, { name: 'Jo Yu-min', pos: 'D' }, { name: 'Lee Han-beom', pos: 'D' }, { name: 'Kim Tae-hyeon', pos: 'D' }, { name: 'Park Jin-seob', pos: 'D' }, { name: 'Lee Ki-hyeok', pos: 'D' }, { name: 'Lee Tae-seok', pos: 'D' }, { name: 'Seol Young-woo', pos: 'D' }, { name: 'Jens Castrop', pos: 'D' }, { name: 'Kim Moon-hwan', pos: 'D' },
    { name: 'Jo Hyeon-woo', pos: 'G' }, { name: 'Kim Seung-gyu', pos: 'G' }, { name: 'Song Bum-keun', pos: 'G' },
  ],
  'Czech Republic': [
    { name: 'Adam Hlozek', pos: 'F' }, { name: 'Tomas Chory', pos: 'F' }, { name: 'Mojmir Chytil', pos: 'F' }, { name: 'Jan Kuchta', pos: 'F' }, { name: 'Patrik Schick', pos: 'F' }, { name: 'Matej Vydra', pos: 'F' }, { name: 'Denis Visinsky', pos: 'F' },
    { name: 'Lukas Cerv', pos: 'M' }, { name: 'Vladimir Darida', pos: 'M' }, { name: 'Lukas Provod', pos: 'M' }, { name: 'Michal Sadilek', pos: 'M' }, { name: 'Hugo Sochurek', pos: 'M' }, { name: 'Alexandr Sojka', pos: 'M' }, { name: 'Tomas Soucek', pos: 'M' },
    { name: 'Vladimir Coufal', pos: 'D' }, { name: 'David Doudera', pos: 'D' }, { name: 'Tomas Holes', pos: 'D' }, { name: 'Robin Hranac', pos: 'D' }, { name: 'Stepan Chaloupek', pos: 'D' }, { name: 'David Jurasek', pos: 'D' }, { name: 'Ladislav Krejci', pos: 'D' }, { name: 'Jaroslav Zeleny', pos: 'D' }, { name: 'David Zima', pos: 'D' },
    { name: 'Lukas Hornicek', pos: 'G' }, { name: 'Jan Koutny', pos: 'G' }, { name: 'Jindrich Stanek', pos: 'G' },
  ],
  // Group B
  'Canada': [
    { name: 'Jonathan David', pos: 'F' }, { name: 'Promise David', pos: 'F' }, { name: 'Cyle Larin', pos: 'F' }, { name: 'Tani Oluwaseyi', pos: 'F' },
    { name: 'Ali Ahmed', pos: 'M' }, { name: 'Tajon Buchanan', pos: 'M' }, { name: 'Mathieu Choiniere', pos: 'M' }, { name: 'Stephen Eustaquio', pos: 'M' }, { name: 'Marcelo Flores', pos: 'M' }, { name: 'Ismael Kone', pos: 'M' }, { name: 'Liam Millar', pos: 'M' }, { name: 'Jonathan Osorio', pos: 'M' }, { name: 'Nathan Saliba', pos: 'M' }, { name: 'Jacob Shaffelburg', pos: 'M' },
    { name: 'Moise Bombito', pos: 'D' }, { name: 'Derek Cornelius', pos: 'D' }, { name: 'Alphonso Davies', pos: 'D' }, { name: 'Luc de Fougerolles', pos: 'D' }, { name: 'Alistair Johnston', pos: 'D' }, { name: 'Alfie Jones', pos: 'D' }, { name: 'Richie Laryea', pos: 'D' }, { name: 'Niko Sigur', pos: 'D' }, { name: 'Joel Waterman', pos: 'D' },
    { name: 'Dayne St. Clair', pos: 'G' }, { name: 'Maxime Crepeau', pos: 'G' }, { name: 'Owen Goodman', pos: 'G' },
  ],
  'Bosnia-Herzegovina': [
    { name: 'Ermedin Demirovic', pos: 'F' }, { name: 'Jovo Lukic', pos: 'F' }, { name: 'Samed Bazdar', pos: 'F' }, { name: 'Haris Tabakovic', pos: 'F' }, { name: 'Edin Dzeko', pos: 'F' },
    { name: 'Amir Hadziahmetovic', pos: 'M' }, { name: 'Ivan Sunjic', pos: 'M' }, { name: 'Ivan Basic', pos: 'M' }, { name: 'Dzenis Burnic', pos: 'M' }, { name: 'Ermin Mahmic', pos: 'M' }, { name: 'Benjamin Tahirovic', pos: 'M' }, { name: 'Amar Memic', pos: 'M' }, { name: 'Armin Gigovic', pos: 'M' }, { name: 'Kerim Alajbegovic', pos: 'M' }, { name: 'Esmir Bajraktarevic', pos: 'M' },
    { name: 'Sead Kolasinac', pos: 'D' }, { name: 'Amar Dedic', pos: 'D' }, { name: 'Nihad Mujakic', pos: 'D' }, { name: 'Nikola Katic', pos: 'D' }, { name: 'Tarik Muharemovic', pos: 'D' }, { name: 'Stjepan Radeljic', pos: 'D' }, { name: 'Dennis Hadzikadunic', pos: 'D' }, { name: 'Nidal Celik', pos: 'D' },
    { name: 'Nikola Vasilj', pos: 'G' }, { name: 'Martin Zlomislic', pos: 'G' }, { name: 'Osman Hadzikic', pos: 'G' },
  ],
  'Qatar': [
    { name: 'Almoez Ali', pos: 'F' }, { name: 'Akram Afif', pos: 'F' }, { name: 'Tahsin Mohammed', pos: 'F' }, { name: 'Edmilson Junior', pos: 'F' }, { name: 'Ahmed Al-Ganehi', pos: 'F' }, { name: 'Ahmed Alaa', pos: 'F' }, { name: 'Hassan Al-Haydos', pos: 'F' }, { name: 'Mohammed Muntari', pos: 'F' }, { name: 'Yusuf Abdurisag', pos: 'F' },
    { name: 'Ahmed Fathi', pos: 'M' }, { name: 'Jassim Gaber', pos: 'M' }, { name: 'Assim Madibo', pos: 'M' }, { name: 'Abdulaziz Hatem', pos: 'M' }, { name: 'Karim Boudiaf', pos: 'M' }, { name: 'Mohammed Mannai', pos: 'M' },
    { name: 'Boualem Khoukhi', pos: 'D' }, { name: 'Pedro Miguel', pos: 'D' }, { name: 'Sultan Al-Brake', pos: 'D' }, { name: 'Al-Hashmi Al-Hussain', pos: 'D' }, { name: 'Ayoub Al-Alawi', pos: 'D' }, { name: 'Issa Laye', pos: 'D' }, { name: 'Lucas Mendes', pos: 'D' }, { name: 'Homam Al-Amin', pos: 'D' },
    { name: 'Salah Zakaria', pos: 'G' }, { name: 'Meshaal Barsham', pos: 'G' }, { name: 'Mahmoud Abunada', pos: 'G' },
  ],
  'Switzerland': [
    { name: 'Breel Embolo', pos: 'F' }, { name: 'Noah Okafor', pos: 'F' }, { name: 'Dan Ndoye', pos: 'F' }, { name: 'Zeki Amdouni', pos: 'F' }, { name: 'Cedric Itten', pos: 'F' },
    { name: 'Granit Xhaka', pos: 'M' }, { name: 'Johan Manzambi', pos: 'M' }, { name: 'Remo Freuler', pos: 'M' }, { name: 'Denis Zakaria', pos: 'M' }, { name: 'Ardon Jashari', pos: 'M' }, { name: 'Djibril Sow', pos: 'M' }, { name: 'Christian Fassnacht', pos: 'M' }, { name: 'Michel Aebischer', pos: 'M' }, { name: 'Fabian Rieder', pos: 'M' }, { name: 'Ruben Vargas', pos: 'M' },
    { name: 'Manuel Akanji', pos: 'D' }, { name: 'Nico Elvedi', pos: 'D' }, { name: 'Ricardo Rodriguez', pos: 'D' }, { name: 'Silvan Widmer', pos: 'D' }, { name: 'Miro Muheim', pos: 'D' }, { name: 'Aurele Amenda', pos: 'D' }, { name: 'Eray Comert', pos: 'D' }, { name: 'Luca Jaquez', pos: 'D' },
    { name: 'Gregor Kobel', pos: 'G' }, { name: 'Yvon Mvogo', pos: 'G' }, { name: 'Marvin Keller', pos: 'G' },
  ],
  // Group C
  'Brazil': [
    { name: 'Endrick', pos: 'F' }, { name: 'Gabriel Martinelli', pos: 'F' }, { name: 'Igor Thiago', pos: 'F' }, { name: 'Luiz Henrique', pos: 'F' }, { name: 'Matheus Cunha', pos: 'F' }, { name: 'Neymar', pos: 'F' }, { name: 'Raphinha', pos: 'F' }, { name: 'Rayan', pos: 'F' }, { name: 'Vinicius Junior', pos: 'F' },
    { name: 'Bruno Guimaraes', pos: 'M' }, { name: 'Casemiro', pos: 'M' }, { name: 'Danilo Santos', pos: 'M' }, { name: 'Fabinho', pos: 'M' }, { name: 'Lucas Paqueta', pos: 'M' },
    { name: 'Alex Sandro', pos: 'D' }, { name: 'Bremer', pos: 'D' }, { name: 'Danilo', pos: 'D' }, { name: 'Douglas Santos', pos: 'D' }, { name: 'Gabriel Magalhaes', pos: 'D' }, { name: 'Leo Pereira', pos: 'D' }, { name: 'Marquinhos', pos: 'D' }, { name: 'Roger Ibanez', pos: 'D' }, { name: 'Wesley', pos: 'D' },
    { name: 'Alisson', pos: 'G' }, { name: 'Ederson', pos: 'G' }, { name: 'Weverton', pos: 'G' },
  ],
  'Morocco': [
    { name: 'Abde Ezzalzouli', pos: 'F' }, { name: 'Chemsdine Talbi', pos: 'F' }, { name: 'Soufiane Rahimi', pos: 'F' }, { name: 'Ayoub El Kaabi', pos: 'F' }, { name: 'Brahim Diaz', pos: 'F' }, { name: 'Gessime Yassine', pos: 'F' }, { name: 'Ayoube Amaimouni', pos: 'F' },
    { name: 'Samir El Mourabet', pos: 'M' }, { name: 'Ayyoub Bouaddi', pos: 'M' }, { name: 'Neil El Aynaoui', pos: 'M' }, { name: 'Sofyan Amrabat', pos: 'M' }, { name: 'Azzedine Ounahi', pos: 'M' }, { name: 'Bilal El Khannouss', pos: 'M' }, { name: 'Ismael Saibari', pos: 'M' },
    { name: 'Noussair Mazraoui', pos: 'D' }, { name: 'Anass Salah-Eddine', pos: 'D' }, { name: 'Youssef Belammari', pos: 'D' }, { name: 'Achraf Hakimi', pos: 'D' }, { name: 'Zakaria El Ouahdi', pos: 'D' }, { name: 'Chadi Riad', pos: 'D' }, { name: 'Nayef Aguerd', pos: 'D' }, { name: 'Redouane Halhal', pos: 'D' }, { name: 'Issa Diop', pos: 'D' },
    { name: 'Yassine Bounou', pos: 'G' }, { name: 'Munir El Kajoui', pos: 'G' }, { name: 'Reda Tagnaouti', pos: 'G' },
  ],
  'Haiti': [
    { name: 'Don Deedson Louicius', pos: 'F' }, { name: 'Josue Casimir', pos: 'F' }, { name: 'Derrick Etienne', pos: 'F' }, { name: 'Ruben Providence', pos: 'F' }, { name: 'Duckens Nazon', pos: 'F' }, { name: 'Frantzdy Pierrot', pos: 'F' }, { name: 'Wilson Isidor', pos: 'F' }, { name: 'Yassin Fortune', pos: 'F' }, { name: 'Lenny Joseph', pos: 'F' },
    { name: 'Carl Fred Sainte', pos: 'M' }, { name: 'Leverton Pierre', pos: 'M' }, { name: 'Danley Jean Jacques', pos: 'M' }, { name: 'Jean-Ricner Bellegarde', pos: 'M' }, { name: 'Woodensky Pierre', pos: 'M' }, { name: 'Dominique Simon', pos: 'M' },
    { name: 'Carlens Arcus', pos: 'D' }, { name: 'Wilguens Paugain', pos: 'D' }, { name: 'Duke Lacroix', pos: 'D' }, { name: 'Martin Experience', pos: 'D' }, { name: 'Jean-Kevin Duverne', pos: 'D' }, { name: 'Ricardo Ade', pos: 'D' }, { name: 'Hannes Delcroix', pos: 'D' }, { name: 'Keeto Thermoncy', pos: 'D' },
    { name: 'Johny Placide', pos: 'G' }, { name: 'Alexandre Pierre', pos: 'G' }, { name: 'Josue Duverger', pos: 'G' },
  ],
  'Scotland': [
    { name: 'Che Adams', pos: 'F' }, { name: 'Lyndon Dykes', pos: 'F' }, { name: 'George Hirst', pos: 'F' }, { name: 'Lawrence Shankland', pos: 'F' }, { name: 'Ross Stewart', pos: 'F' },
    { name: 'Ryan Christie', pos: 'M' }, { name: 'Finlay Curtis', pos: 'M' }, { name: 'Lewis Ferguson', pos: 'M' }, { name: 'Ben Gannon-Doak', pos: 'M' }, { name: 'Billy Gilmour', pos: 'M' }, { name: 'John McGinn', pos: 'M' }, { name: 'Kenny McLean', pos: 'M' }, { name: 'Scott McTominay', pos: 'M' },
    { name: 'Grant Hanley', pos: 'D' }, { name: 'Jack Hendry', pos: 'D' }, { name: 'Aaron Hickey', pos: 'D' }, { name: 'Dom Hyam', pos: 'D' }, { name: 'Scott McKenna', pos: 'D' }, { name: 'Nathan Patterson', pos: 'D' }, { name: 'Anthony Ralston', pos: 'D' }, { name: 'Andy Robertson', pos: 'D' }, { name: 'John Souttar', pos: 'D' }, { name: 'Kieran Tierney', pos: 'D' },
    { name: 'Craig Gordon', pos: 'G' }, { name: 'Angus Gunn', pos: 'G' }, { name: 'Liam Kelly', pos: 'G' },
  ],
  // Group D
  'United States': [
    { name: 'Christian Pulisic', pos: 'F' }, { name: 'Gio Reyna', pos: 'F' }, { name: 'Folarin Balogun', pos: 'F' }, { name: 'Ricardo Pepi', pos: 'F' }, { name: 'Haji Wright', pos: 'F' },
    { name: 'Tyler Adams', pos: 'M' }, { name: 'Sebastian Berhalter', pos: 'M' }, { name: 'Weston McKennie', pos: 'M' }, { name: 'Cristian Roldan', pos: 'M' }, { name: 'Brenden Aaronson', pos: 'M' }, { name: 'Malik Tillman', pos: 'M' }, { name: 'Tim Weah', pos: 'M' }, { name: 'Alejandro Zendejas', pos: 'M' },
    { name: 'Max Arfsten', pos: 'D' }, { name: 'Sergino Dest', pos: 'D' }, { name: 'Alex Freeman', pos: 'D' }, { name: 'Mark McKenzie', pos: 'D' }, { name: 'Tim Ream', pos: 'D' }, { name: 'Chris Richards', pos: 'D' }, { name: 'Antonee Robinson', pos: 'D' }, { name: 'Miles Robinson', pos: 'D' }, { name: 'Joe Scally', pos: 'D' }, { name: 'Auston Trusty', pos: 'D' },
    { name: 'Chris Brady', pos: 'G' }, { name: 'Matt Freese', pos: 'G' }, { name: 'Matt Turner', pos: 'G' },
  ],
  'Paraguay': [
    { name: 'Antonio Sanabria', pos: 'F' }, { name: 'Julio Enciso', pos: 'F' }, { name: 'Gabriel Avalos', pos: 'F' }, { name: 'Alex Arce', pos: 'F' }, { name: 'Isidro Pitta', pos: 'F' }, { name: 'Gustavo Caballero', pos: 'F' },
    { name: 'Miguel Almiron', pos: 'M' }, { name: 'Kaku', pos: 'M' }, { name: 'Andres Cubas', pos: 'M' }, { name: 'Ramon Sosa', pos: 'M' }, { name: 'Diego Gomez', pos: 'M' }, { name: 'Damian Bobadilla', pos: 'M' }, { name: 'Braian Ojeda', pos: 'M' }, { name: 'Matias Galarza', pos: 'M' }, { name: 'Mauricio', pos: 'M' },
    { name: 'Gustavo Gomez', pos: 'D' }, { name: 'Junior Alonso', pos: 'D' }, { name: 'Fabian Balbuena', pos: 'D' }, { name: 'Omar Alderete', pos: 'D' }, { name: 'Juan Caceres', pos: 'D' }, { name: 'Jose Canale', pos: 'D' }, { name: 'Alexandro Maidana', pos: 'D' }, { name: 'Gustavo Velazquez', pos: 'D' },
    { name: 'Roberto Fernandez', pos: 'G' }, { name: 'Orlando Gill', pos: 'G' }, { name: 'Gaston Olveira', pos: 'G' },
  ],
  'Australia': [
    { name: 'Connor Metcalfe', pos: 'F' }, { name: 'Mathew Leckie', pos: 'F' }, { name: 'Nishan Velupillay', pos: 'F' }, { name: 'Cristian Volpato', pos: 'F' }, { name: 'Nestory Irankunda', pos: 'F' }, { name: 'Awer Mabil', pos: 'F' }, { name: 'Ajdin Hrustic', pos: 'F' }, { name: 'Mohamed Toure', pos: 'F' }, { name: 'Tete Yengi', pos: 'F' },
    { name: 'Jackson Irvine', pos: 'M' }, { name: 'Aiden O\'Neill', pos: 'M' }, { name: 'Paul Okon Jr', pos: 'M' }, { name: 'Cameron Devlin', pos: 'M' },
    { name: 'Jordan Bos', pos: 'D' }, { name: 'Aziz Behich', pos: 'D' }, { name: 'Harry Souttar', pos: 'D' }, { name: 'Alessandro Circati', pos: 'D' }, { name: 'Lucas Herrington', pos: 'D' }, { name: 'Cameron Burgess', pos: 'D' }, { name: 'Kai Trewin', pos: 'D' }, { name: 'Milos Degenek', pos: 'D' }, { name: 'Jason Geria', pos: 'D' }, { name: 'Jacob Italiano', pos: 'D' },
    { name: 'Mathew Ryan', pos: 'G' }, { name: 'Paul Izzo', pos: 'G' }, { name: 'Patrick Beach', pos: 'G' },
  ],
  'Turkey': [
    { name: 'Kerem Akturkoglu', pos: 'F' }, { name: 'Irfan Can Kahveci', pos: 'F' }, { name: 'Baris Alper Yilmaz', pos: 'F' }, { name: 'Arda Guler', pos: 'F' }, { name: 'Kenan Yildiz', pos: 'F' }, { name: 'Yunus Akgun', pos: 'F' }, { name: 'Oguz Aydin', pos: 'F' }, { name: 'Deniz Gul', pos: 'F' }, { name: 'Can Uzun', pos: 'F' },
    { name: 'Hakan Calhanoglu', pos: 'M' }, { name: 'Kaan Ayhan', pos: 'M' }, { name: 'Orkun Kokcu', pos: 'M' }, { name: 'Ismail Yuksek', pos: 'M' }, { name: 'Salih Ozcan', pos: 'M' },
    { name: 'Merih Demiral', pos: 'D' }, { name: 'Zeki Celik', pos: 'D' }, { name: 'Caglar Soyuncu', pos: 'D' }, { name: 'Mert Muldur', pos: 'D' }, { name: 'Ferdi Kadioglu', pos: 'D' }, { name: 'Ozan Kabak', pos: 'D' }, { name: 'Abdulkerim Bardakci', pos: 'D' }, { name: 'Eren Elmali', pos: 'D' }, { name: 'Samet Akaydin', pos: 'D' },
    { name: 'Ugurcan Cakir', pos: 'G' }, { name: 'Mert Gunok', pos: 'G' }, { name: 'Altay Bayindir', pos: 'G' },
  ],
  // Group E
  'Germany': [
    { name: 'Maximilian Beier', pos: 'F' }, { name: 'Kai Havertz', pos: 'F' }, { name: 'Lennart Karl', pos: 'F' }, { name: 'Jamal Musiala', pos: 'F' }, { name: 'Leroy Sane', pos: 'F' }, { name: 'Deniz Undav', pos: 'F' }, { name: 'Nick Woltemade', pos: 'F' },
    { name: 'Pascal Gross', pos: 'M' }, { name: 'Joshua Kimmich', pos: 'M' }, { name: 'Felix Nmecha', pos: 'M' }, { name: 'Aleksandar Pavlovic', pos: 'M' }, { name: 'Angelo Stiller', pos: 'M' }, { name: 'Leon Goretzka', pos: 'M' }, { name: 'Florian Wirtz', pos: 'M' }, { name: 'Jamie Leweling', pos: 'M' },
    { name: 'Waldemar Anton', pos: 'D' }, { name: 'Nathaniel Brown', pos: 'D' }, { name: 'David Raum', pos: 'D' }, { name: 'Antonio Rudiger', pos: 'D' }, { name: 'Nico Schlotterbeck', pos: 'D' }, { name: 'Jonathan Tah', pos: 'D' }, { name: 'Malick Thiaw', pos: 'D' },
    { name: 'Oliver Baumann', pos: 'G' }, { name: 'Manuel Neuer', pos: 'G' }, { name: 'Alexander Nubel', pos: 'G' },
  ],
  'Curacao': [
    { name: 'Jeremy Antonisse', pos: 'F' }, { name: 'Tahith Chong', pos: 'F' }, { name: 'Kenji Gorre', pos: 'F' }, { name: 'Sontje Hansen', pos: 'F' }, { name: 'Gervane Kastaneer', pos: 'F' }, { name: 'Brandley Kuwas', pos: 'F' }, { name: 'Jurgen Locadia', pos: 'F' }, { name: 'Jearl Margaritha', pos: 'F' },
    { name: 'Juninho Bacuna', pos: 'M' }, { name: 'Leandro Bacuna', pos: 'M' }, { name: 'Livano Comenencia', pos: 'M' }, { name: 'Kevin Felida', pos: 'M' }, { name: 'Arjany Martha', pos: 'M' }, { name: 'Tyrese Noslin', pos: 'M' }, { name: 'Godfried Roemeratoe', pos: 'M' },
    { name: 'Riechedly Bazoer', pos: 'D' }, { name: 'Joshua Brenet', pos: 'D' }, { name: 'Roshon van Eijma', pos: 'D' }, { name: 'Sherel Floranus', pos: 'D' }, { name: 'Deveron Fonville', pos: 'D' }, { name: 'Jurien Gaari', pos: 'D' }, { name: 'Armando Obispo', pos: 'D' }, { name: 'Shurandy Sambo', pos: 'D' },
    { name: 'Eloy Room', pos: 'G' }, { name: 'Tyrick Bodak', pos: 'G' }, { name: 'Trevor Doornbusch', pos: 'G' },
  ],
  'Ivory Coast': [
    { name: 'Simon Adingra', pos: 'F' }, { name: 'Ange-Yoan Bonny', pos: 'F' }, { name: 'Amad Diallo', pos: 'F' }, { name: 'Oumar Diakite', pos: 'F' }, { name: 'Yan Diomande', pos: 'F' }, { name: 'Evann Guessand', pos: 'F' }, { name: 'Nicolas Pepe', pos: 'F' }, { name: 'Bazoumana Toure', pos: 'F' }, { name: 'Elye Wahi', pos: 'F' },
    { name: 'Seko Fofana', pos: 'M' }, { name: 'Parfait Guiagon', pos: 'M' }, { name: 'Franck Kessie', pos: 'M' }, { name: 'Christ Inao Oulai', pos: 'M' }, { name: 'Ibrahim Sangare', pos: 'M' }, { name: 'Jean-Michael Seri', pos: 'M' },
    { name: 'Emmanuel Agbadou', pos: 'D' }, { name: 'Clement Akpa', pos: 'D' }, { name: 'Ousmane Diomande', pos: 'D' }, { name: 'Guela Doue', pos: 'D' }, { name: 'Ghislain Konan', pos: 'D' }, { name: 'Odilon Kossounou', pos: 'D' }, { name: 'Evan Ndicka', pos: 'D' }, { name: 'Wilfried Singo', pos: 'D' },
    { name: 'Yahia Fofana', pos: 'G' }, { name: 'Mohamed Kone', pos: 'G' }, { name: 'Alban Lafont', pos: 'G' },
  ],
  'Ecuador': [
    { name: 'Kevin Rodriguez', pos: 'F' }, { name: 'Anthony Valencia', pos: 'F' }, { name: 'Enner Valencia', pos: 'F' }, { name: 'Jordy Caicedo', pos: 'F' }, { name: 'Jeremy Arevalo', pos: 'F' },
    { name: 'Alan Minda', pos: 'M' }, { name: 'Moises Caicedo', pos: 'M' }, { name: 'Jordy Alcivar', pos: 'M' }, { name: 'Denil Castillo', pos: 'M' }, { name: 'John Yeboah', pos: 'M' }, { name: 'Alan Franco', pos: 'M' }, { name: 'Pedro Vite', pos: 'M' }, { name: 'Kendry Paez', pos: 'M' }, { name: 'Nilson Angulo', pos: 'M' }, { name: 'Gonzalo Plata', pos: 'M' },
    { name: 'Willian Pacho', pos: 'D' }, { name: 'Piero Hincapie', pos: 'D' }, { name: 'Joel Ordonez', pos: 'D' }, { name: 'Felix Torres', pos: 'D' }, { name: 'Pervis Estupinan', pos: 'D' }, { name: 'Yaimar Medina', pos: 'D' }, { name: 'Angelo Preciado', pos: 'D' }, { name: 'Jackson Porozo', pos: 'D' },
    { name: 'Hernan Galindez', pos: 'G' }, { name: 'Moises Ramirez', pos: 'G' }, { name: 'Gonzalo Valle', pos: 'G' },
  ],
  // Group F
  'Netherlands': [
    { name: 'Brian Brobbey', pos: 'F' }, { name: 'Memphis Depay', pos: 'F' }, { name: 'Cody Gakpo', pos: 'F' }, { name: 'Justin Kluivert', pos: 'F' }, { name: 'Noa Lang', pos: 'F' }, { name: 'Donyell Malen', pos: 'F' }, { name: 'Crysencio Summerville', pos: 'F' }, { name: 'Wout Weghorst', pos: 'F' },
    { name: 'Frenkie de Jong', pos: 'M' }, { name: 'Marten de Roon', pos: 'M' }, { name: 'Ryan Gravenberch', pos: 'M' }, { name: 'Teun Koopmeiners', pos: 'M' }, { name: 'Tijjani Reijnders', pos: 'M' }, { name: 'Guus Til', pos: 'M' }, { name: 'Quinten Timber', pos: 'M' }, { name: 'Mats Wieffer', pos: 'M' },
    { name: 'Nathan Ake', pos: 'D' }, { name: 'Denzel Dumfries', pos: 'D' }, { name: 'Jorrel Hato', pos: 'D' }, { name: 'Jurrien Timber', pos: 'D' }, { name: 'Jan Paul van Hecke', pos: 'D' }, { name: 'Micky van de Ven', pos: 'D' }, { name: 'Virgil van Dijk', pos: 'D' },
    { name: 'Mark Flekken', pos: 'G' }, { name: 'Robin Roefs', pos: 'G' }, { name: 'Bart Verbruggen', pos: 'G' },
  ],
  'Japan': [
    { name: 'Koki Ogawa', pos: 'F' }, { name: 'Daizen Maeda', pos: 'F' }, { name: 'Ayase Ueda', pos: 'F' }, { name: 'Kento Shiogai', pos: 'F' }, { name: 'Keisuke Goto', pos: 'F' },
    { name: 'Junnosuke Suzuki', pos: 'M' }, { name: 'Wataru Endo', pos: 'M' }, { name: 'Junya Ito', pos: 'M' }, { name: 'Daichi Kamada', pos: 'M' }, { name: 'Ritsu Doan', pos: 'M' }, { name: 'Ao Tanaka', pos: 'M' }, { name: 'Keito Nakamura', pos: 'M' }, { name: 'Kaishu Sano', pos: 'M' }, { name: 'Takefusa Kubo', pos: 'M' }, { name: 'Yuito Suzuki', pos: 'M' },
    { name: 'Yuto Nagatomo', pos: 'D' }, { name: 'Shogo Taniguchi', pos: 'D' }, { name: 'Ko Itakura', pos: 'D' }, { name: 'Tsuyoshi Watanabe', pos: 'D' }, { name: 'Takehiro Tomiyasu', pos: 'D' }, { name: 'Hiroki Ito', pos: 'D' }, { name: 'Ayumu Seko', pos: 'D' }, { name: 'Yukinari Sugawara', pos: 'D' },
    { name: 'Zion Suzuki', pos: 'G' }, { name: 'Keisuke Osako', pos: 'G' }, { name: 'Tomoki Hayakawa', pos: 'G' },
  ],
  'Sweden': [
    { name: 'Alexander Bernhardsson', pos: 'F' }, { name: 'Anthony Elanga', pos: 'F' }, { name: 'Viktor Gyokeres', pos: 'F' }, { name: 'Alexander Isak', pos: 'F' }, { name: 'Gustaf Nilsson', pos: 'F' }, { name: 'Benjamin Nygren', pos: 'F' },
    { name: 'Taha Ali', pos: 'M' }, { name: 'Yasin Ayari', pos: 'M' }, { name: 'Lucas Bergvall', pos: 'M' }, { name: 'Jesper Karlstrom', pos: 'M' }, { name: 'Ken Sema', pos: 'M' }, { name: 'Mattias Svanberg', pos: 'M' }, { name: 'Besfort Zeneli', pos: 'M' },
    { name: 'Hjalmar Ekdal', pos: 'D' }, { name: 'Gabriel Gudmundsson', pos: 'D' }, { name: 'Isak Hien', pos: 'D' }, { name: 'Emil Holm', pos: 'D' }, { name: 'Gustaf Lagerbielke', pos: 'D' }, { name: 'Victor Lindelof', pos: 'D' }, { name: 'Erik Smith', pos: 'D' }, { name: 'Carl Starfelt', pos: 'D' }, { name: 'Elliot Stroud', pos: 'D' }, { name: 'Daniel Svensson', pos: 'D' },
    { name: 'Viktor Johansson', pos: 'G' }, { name: 'Kristoffer Nordfeldt', pos: 'G' }, { name: 'Jacob Widell Zetterstrom', pos: 'G' },
  ],
  'Tunisia': [
    { name: 'Elias Achouri', pos: 'F' }, { name: 'Ismael Gharbi', pos: 'F' }, { name: 'Elias Saad', pos: 'F' }, { name: 'Sebastian Tounekti', pos: 'F' }, { name: 'Firas Chaouat', pos: 'F' }, { name: 'Khalil Ayari', pos: 'F' }, { name: 'Hazem Mastouri', pos: 'F' }, { name: 'Rayan Elloumi', pos: 'F' },
    { name: 'Ellyes Skhiri', pos: 'M' }, { name: 'Hannibal Mejbri', pos: 'M' }, { name: 'Anis Ben Slimane', pos: 'M' }, { name: 'Hadj Mahmoud', pos: 'M' }, { name: 'Rani Khedira', pos: 'M' }, { name: 'Mortadha Ben Ouanes', pos: 'M' },
    { name: 'Montassar Talbi', pos: 'D' }, { name: 'Dylan Bronn', pos: 'D' }, { name: 'Omar Rekik', pos: 'D' }, { name: 'Yan Valery', pos: 'D' }, { name: 'Ali Abdi', pos: 'D' }, { name: 'Moutaz Neffati', pos: 'D' }, { name: 'Raed Chikhaoui', pos: 'D' }, { name: 'Adam Arous', pos: 'D' }, { name: 'Mohamed Amine Ben Hamida', pos: 'D' },
    { name: 'Aymen Dahmen', pos: 'G' }, { name: 'Sabri Ben Hessen', pos: 'G' }, { name: 'Abdelmouhib Chamakh', pos: 'G' },
  ],
  // Group G
  'Belgium': [
    { name: 'Charles De Ketelaere', pos: 'F' }, { name: 'Jeremy Doku', pos: 'F' }, { name: 'Matias Fernandez-Pardo', pos: 'F' }, { name: 'Romelu Lukaku', pos: 'F' }, { name: 'Dodi Lukebakio', pos: 'F' }, { name: 'Diego Moreira', pos: 'F' }, { name: 'Alexis Saelemaekers', pos: 'F' }, { name: 'Leandro Trossard', pos: 'F' },
    { name: 'Kevin De Bruyne', pos: 'M' }, { name: 'Amadou Onana', pos: 'M' }, { name: 'Nicolas Raskin', pos: 'M' }, { name: 'Youri Tielemans', pos: 'M' }, { name: 'Hans Vanaken', pos: 'M' }, { name: 'Axel Witsel', pos: 'M' },
    { name: 'Timothy Castagne', pos: 'D' }, { name: 'Zeno Debast', pos: 'D' }, { name: 'Maxim De Cuyper', pos: 'D' }, { name: 'Koni De Winter', pos: 'D' }, { name: 'Brandon Mechele', pos: 'D' }, { name: 'Thomas Meunier', pos: 'D' }, { name: 'Nathan Ngoy', pos: 'D' }, { name: 'Joaquin Seys', pos: 'D' }, { name: 'Arthur Theate', pos: 'D' },
    { name: 'Thibaut Courtois', pos: 'G' }, { name: 'Senne Lammens', pos: 'G' }, { name: 'Mike Penders', pos: 'G' },
  ],
  'Egypt': [
    { name: 'Omar Marmoush', pos: 'F' }, { name: 'Mohamed Salah', pos: 'F' }, { name: 'Hamza Abdelkarim', pos: 'F' },
    { name: 'Marwan Attia', pos: 'M' }, { name: 'Mohanad Lasheen', pos: 'M' }, { name: 'Nabil Emad', pos: 'M' }, { name: 'Mahmoud Saber', pos: 'M' }, { name: 'Ahmed Zizo', pos: 'M' }, { name: 'Emam Ashour', pos: 'M' }, { name: 'Mostafa Ziko', pos: 'M' }, { name: 'Mahmoud Trezeguet', pos: 'M' }, { name: 'Ibrahim Adel', pos: 'M' }, { name: 'Haissem Hassan', pos: 'M' },
    { name: 'Mohamed Hany', pos: 'D' }, { name: 'Tarek Alaa', pos: 'D' }, { name: 'Hamdy Fathy', pos: 'D' }, { name: 'Ramy Rabia', pos: 'D' }, { name: 'Yasser Ibrahim', pos: 'D' }, { name: 'Hossam Abdelmaguid', pos: 'D' }, { name: 'Mohamed Abdelmonem', pos: 'D' }, { name: 'Ahmed Fatouh', pos: 'D' }, { name: 'Karim Hafez', pos: 'D' },
    { name: 'Mohamed El Shenawy', pos: 'G' }, { name: 'Mostafa Shobeir', pos: 'G' }, { name: 'El Mahdy Soliman', pos: 'G' }, { name: 'Mohamed Alaa', pos: 'G' },
  ],
  'Iran': [
    { name: 'Ali Alipour', pos: 'F' }, { name: 'Dennis Dargahi', pos: 'F' }, { name: 'Amirhossein Hosseinzadeh', pos: 'F' }, { name: 'Amirhossein Mahmoudi', pos: 'F' }, { name: 'Mehdi Taremi', pos: 'F' },
    { name: 'Rouzbeh Cheshmi', pos: 'M' }, { name: 'Saeid Ezatolahi', pos: 'M' }, { name: 'Mehdi Ghaedi', pos: 'M' }, { name: 'Saman Ghoddos', pos: 'M' }, { name: 'Mohammad Ghorbani', pos: 'M' }, { name: 'Alireza Jahanbakhsh', pos: 'M' }, { name: 'Mohammad Mohebi', pos: 'M' }, { name: 'Amir Mohammad Razzaghinia', pos: 'M' }, { name: 'Mehdi Torabi', pos: 'M' }, { name: 'Aria Yousefi', pos: 'M' },
    { name: 'Danial Eiri', pos: 'D' }, { name: 'Ehsan Hajsafi', pos: 'D' }, { name: 'Saleh Hardani', pos: 'D' }, { name: 'Hossein Kanaani', pos: 'D' }, { name: 'Shoka Khalilzadeh', pos: 'D' }, { name: 'Milad Mohammadi', pos: 'D' }, { name: 'Ali Nemati', pos: 'D' }, { name: 'Ramin Rezaeian', pos: 'D' },
    { name: 'Alireza Beiranvand', pos: 'G' }, { name: 'Hossein Hosseini', pos: 'G' }, { name: 'Payam Niazmand', pos: 'G' },
  ],
  'New Zealand': [
    { name: 'Chris Wood', pos: 'F' }, { name: 'Eli Just', pos: 'F' }, { name: 'Kosta Barbarouses', pos: 'F' }, { name: 'Ben Waine', pos: 'F' }, { name: 'Ben Old', pos: 'F' }, { name: 'Callum McCowatt', pos: 'F' }, { name: 'Jesse Randall', pos: 'F' }, { name: 'Lachlan Bayliss', pos: 'F' },
    { name: 'Joe Bell', pos: 'M' }, { name: 'Matt Garbett', pos: 'M' }, { name: 'Marko Stamenic', pos: 'M' }, { name: 'Sarpreet Singh', pos: 'M' }, { name: 'Alex Rufer', pos: 'M' }, { name: 'Ryan Thomas', pos: 'M' },
    { name: 'Tim Payne', pos: 'D' }, { name: 'Francis De Vries', pos: 'D' }, { name: 'Tyler Bindon', pos: 'D' }, { name: 'Michael Boxall', pos: 'D' }, { name: 'Liberato Cacace', pos: 'D' }, { name: 'Nando Pijnaker', pos: 'D' }, { name: 'Finn Surman', pos: 'D' }, { name: 'Callan Elliot', pos: 'D' }, { name: 'Tommy Smith', pos: 'D' },
    { name: 'Max Crocombe', pos: 'G' }, { name: 'Alex Paulsen', pos: 'G' }, { name: 'Michael Woud', pos: 'G' },
  ],
  // Group H
  'Spain': [
    { name: 'Lamine Yamal', pos: 'F' }, { name: 'Nico Williams', pos: 'F' }, { name: 'Dani Olmo', pos: 'F' }, { name: 'Ferran Torres', pos: 'F' }, { name: 'Mikel Oyarzabal', pos: 'F' }, { name: 'Yeremy Pino', pos: 'F' }, { name: 'Borja Iglesias', pos: 'F' }, { name: 'Victor Munoz', pos: 'F' },
    { name: 'Gavi', pos: 'M' }, { name: 'Rodri', pos: 'M' }, { name: 'Pedri', pos: 'M' }, { name: 'Martin Zubimendi', pos: 'M' }, { name: 'Fabian Ruiz', pos: 'M' }, { name: 'Alex Baena', pos: 'M' }, { name: 'Mikel Merino', pos: 'M' },
    { name: 'Marc Cucurella', pos: 'D' }, { name: 'Pau Cubarsi', pos: 'D' }, { name: 'Aymeric Laporte', pos: 'D' }, { name: 'Alex Grimaldo', pos: 'D' }, { name: 'Pedro Porro', pos: 'D' }, { name: 'Eric Garcia', pos: 'D' }, { name: 'Marcos Llorente', pos: 'D' }, { name: 'Marc Pubill', pos: 'D' },
    { name: 'Unai Simon', pos: 'G' }, { name: 'David Raya', pos: 'G' }, { name: 'Joan Garcia', pos: 'G' },
  ],
  'Cape Verde': [
    { name: 'Ryan Mendes', pos: 'F' }, { name: 'Willy Semedo', pos: 'F' }, { name: 'Garry Rodrigues', pos: 'F' }, { name: 'Jovane Cabral', pos: 'F' }, { name: 'Nuno da Costa', pos: 'F' }, { name: 'Dailon Livramento', pos: 'F' }, { name: 'Gilson Benchimol', pos: 'F' }, { name: 'Helio Varela', pos: 'F' },
    { name: 'Jamiro Monteiro', pos: 'M' }, { name: 'Telmo Arcanjo', pos: 'M' }, { name: 'Yannick Semedo', pos: 'M' }, { name: 'Laros Duarte', pos: 'M' }, { name: 'Deroy Duarte', pos: 'M' }, { name: 'Kevin Pina', pos: 'M' },
    { name: 'Steven Moreira', pos: 'D' }, { name: 'Wagner Pina', pos: 'D' }, { name: 'Joao Paulo', pos: 'D' }, { name: 'Sidny Lopes Cabral', pos: 'D' }, { name: 'Logan Costa', pos: 'D' }, { name: 'Pico', pos: 'D' }, { name: 'Kelvin Pires', pos: 'D' }, { name: 'Stopira', pos: 'D' }, { name: 'Diney', pos: 'D' },
    { name: 'Vozinha', pos: 'G' }, { name: 'Marcio Rosa', pos: 'G' }, { name: 'CJ dos Santos', pos: 'G' },
  ],
  'Saudi Arabia': [
    { name: 'Firas Al Buraikan', pos: 'F' }, { name: 'Saleh Al Shehri', pos: 'F' }, { name: 'Abdullah Al Hamdan', pos: 'F' },
    { name: 'Mohammed Kanno', pos: 'M' }, { name: 'Abdullah Al Khaibari', pos: 'M' }, { name: 'Ziyad Al Johani', pos: 'M' }, { name: 'Nasser Al Dawsari', pos: 'M' }, { name: 'Musab Al Juwayr', pos: 'M' }, { name: 'Alaa Al Hajji', pos: 'M' }, { name: 'Salem Al Dawsari', pos: 'M' }, { name: 'Khalid Al Ghannam', pos: 'M' }, { name: 'Ayman Yahya', pos: 'M' },
    { name: 'Abdulelah Al Amri', pos: 'D' }, { name: 'Hassan Tambakti', pos: 'D' }, { name: 'Jehad Thikri', pos: 'D' }, { name: 'Ali Lajami', pos: 'D' }, { name: 'Hassan Kadesh', pos: 'D' }, { name: 'Saud Abdulhamid', pos: 'D' }, { name: 'Mohammed Abu Al Shamat', pos: 'D' }, { name: 'Ali Majrashi', pos: 'D' }, { name: 'Moteb Al Harbi', pos: 'D' }, { name: 'Nawaf Boushal', pos: 'D' }, { name: 'Sultan Al-Ghannam', pos: 'D' },
    { name: 'Mohammed Al Owais', pos: 'G' }, { name: 'Nawaf Al Aqidi', pos: 'G' }, { name: 'Ahmed Al Kassar', pos: 'G' },
  ],
  'Uruguay': [
    { name: 'Darwin Nunez', pos: 'F' }, { name: 'Federico Vinas', pos: 'F' }, { name: 'Rodrigo Aguirre', pos: 'F' },
    { name: 'Federico Valverde', pos: 'M' }, { name: 'Rodrigo Bentancur', pos: 'M' }, { name: 'Manuel Ugarte', pos: 'M' }, { name: 'Emiliano Martinez', pos: 'M' }, { name: 'Rodrigo Zalazar', pos: 'M' }, { name: 'Giorgian De Arrascaeta', pos: 'M' }, { name: 'Nicolas De La Cruz', pos: 'M' }, { name: 'Agustin Canobbio', pos: 'M' }, { name: 'Maximiliano Araujo', pos: 'M' }, { name: 'Brian Rodriguez', pos: 'M' }, { name: 'Facundo Pellistri', pos: 'M' },
    { name: 'Ronald Araujo', pos: 'D' }, { name: 'Jose Maria Gimenez', pos: 'D' }, { name: 'Santiago Bueno', pos: 'D' }, { name: 'Sebastian Caceres', pos: 'D' }, { name: 'Mathias Olivera', pos: 'D' }, { name: 'Guillermo Varela', pos: 'D' }, { name: 'Matias Vina', pos: 'D' }, { name: 'Joaquin Piquerez', pos: 'D' }, { name: 'Juan Manuel Sanabria', pos: 'D' },
    { name: 'Fernando Muslera', pos: 'G' }, { name: 'Sergio Rochet', pos: 'G' }, { name: 'Santiago Mele', pos: 'G' },
  ],
  // Group I
  'France': [
    { name: 'Maghnes Akliouche', pos: 'F' }, { name: 'Bradley Barcola', pos: 'F' }, { name: 'Rayan Cherki', pos: 'F' }, { name: 'Ousmane Dembele', pos: 'F' }, { name: 'Desire Doue', pos: 'F' }, { name: 'Jean-Philippe Mateta', pos: 'F' }, { name: 'Kylian Mbappe', pos: 'F' }, { name: 'Michael Olise', pos: 'F' }, { name: 'Marcus Thuram', pos: 'F' },
    { name: "N'Golo Kante", pos: 'M' }, { name: 'Manu Kone', pos: 'M' }, { name: 'Adrien Rabiot', pos: 'M' }, { name: 'Aurelien Tchouameni', pos: 'M' }, { name: 'Warren Zaire-Emery', pos: 'M' },
    { name: 'Lucas Digne', pos: 'D' }, { name: 'Malo Gusto', pos: 'D' }, { name: 'Lucas Hernandez', pos: 'D' }, { name: 'Theo Hernandez', pos: 'D' }, { name: 'Ibrahima Konate', pos: 'D' }, { name: 'Jules Kounde', pos: 'D' }, { name: 'Maxence Lacroix', pos: 'D' }, { name: 'William Saliba', pos: 'D' }, { name: 'Dayot Upamecano', pos: 'D' },
    { name: 'Mike Maignan', pos: 'G' }, { name: 'Robin Risser', pos: 'G' }, { name: 'Brice Samba', pos: 'G' },
  ],
  'Senegal': [
    { name: 'Sadio Mane', pos: 'F' }, { name: 'Ismaila Sarr', pos: 'F' }, { name: 'Iliman Ndiaye', pos: 'F' }, { name: 'Assane Diao', pos: 'F' }, { name: 'Ibrahim Mbaye', pos: 'F' }, { name: 'Nicolas Jackson', pos: 'F' }, { name: 'Bamba Dieng', pos: 'F' }, { name: 'Cherif Ndiaye', pos: 'F' },
    { name: 'Idrissa Gana Gueye', pos: 'M' }, { name: 'Pape Gueye', pos: 'M' }, { name: 'Lamine Camara', pos: 'M' }, { name: 'Habib Diarra', pos: 'M' }, { name: 'Pathe Ciss', pos: 'M' }, { name: 'Pape Matar Sarr', pos: 'M' }, { name: 'Bara Sapoko Ndiaye', pos: 'M' },
    { name: 'Krepin Diatta', pos: 'D' }, { name: 'Antoine Mendy', pos: 'D' }, { name: 'Kalidou Koulibaly', pos: 'D' }, { name: 'El Hadji Malick Diouf', pos: 'D' }, { name: 'Mamadou Sarr', pos: 'D' }, { name: 'Moussa Niakhate', pos: 'D' }, { name: 'Abdoulaye Seck', pos: 'D' }, { name: 'Ismail Jakobs', pos: 'D' },
    { name: 'Edouard Mendy', pos: 'G' }, { name: 'Mory Diaw', pos: 'G' }, { name: 'Yehvann Diouf', pos: 'G' },
  ],
  'Iraq': [
    { name: 'Ali Jasim', pos: 'F' }, { name: 'Ali Al-Hamadi', pos: 'F' }, { name: 'Ali Yousef', pos: 'F' }, { name: 'Aymen Hussein', pos: 'F' }, { name: 'Mohanad Ali', pos: 'F' },
    { name: 'Amir Al-Ammari', pos: 'M' }, { name: 'Kevin Yakob', pos: 'M' }, { name: 'Zidane Iqbal', pos: 'M' }, { name: 'Aimar Sher', pos: 'M' }, { name: 'Ibrahim Bayesh', pos: 'M' }, { name: 'Ahmed Qasim', pos: 'M' }, { name: 'Youssef Amyn', pos: 'M' }, { name: 'Marko Farji', pos: 'M' },
    { name: 'Hussein Ali', pos: 'D' }, { name: 'Manaf Younis', pos: 'D' }, { name: 'Zaid Tahseen', pos: 'D' }, { name: 'Rebin Sulaka', pos: 'D' }, { name: 'Akam Hashem', pos: 'D' }, { name: 'Merchas Doski', pos: 'D' }, { name: 'Ahmed Yahya', pos: 'D' }, { name: 'Zaid Ismail', pos: 'D' }, { name: 'Frans Putros', pos: 'D' }, { name: 'Mustafa Saadoon', pos: 'D' },
    { name: 'Fahad Talib', pos: 'G' }, { name: 'Jalal Hassan', pos: 'G' }, { name: 'Ahmed Basil', pos: 'G' },
  ],
  'Norway': [
    { name: 'Erling Haaland', pos: 'F' }, { name: 'Alexander Sorloth', pos: 'F' }, { name: 'Jorgen Strand Larsen', pos: 'F' },
    { name: 'Martin Odegaard', pos: 'M' }, { name: 'Sander Berge', pos: 'M' }, { name: 'Patrick Berg', pos: 'M' }, { name: 'Kristian Thorstvedt', pos: 'M' }, { name: 'Morten Thorsby', pos: 'M' }, { name: 'Thelo Aasgaard', pos: 'M' }, { name: 'Andreas Schjelderup', pos: 'M' }, { name: 'Jens Petter Hauge', pos: 'M' }, { name: 'Fredrik Aursnes', pos: 'M' }, { name: 'Oscar Bobb', pos: 'M' }, { name: 'Antonio Nusa', pos: 'M' },
    { name: 'Julian Ryerson', pos: 'D' }, { name: 'Kristoffer Ajer', pos: 'D' }, { name: 'Leo Ostigard', pos: 'D' }, { name: 'David Moller Wolfe', pos: 'D' }, { name: 'Marcus Pedersen', pos: 'D' }, { name: 'Torbjorn Heggem', pos: 'D' }, { name: 'Fredrik Bjorkan', pos: 'D' }, { name: 'Henrik Falchener', pos: 'D' }, { name: 'Sondre Langas', pos: 'D' },
    { name: 'Orjan Nyland', pos: 'G' }, { name: 'Egil Selvik', pos: 'G' }, { name: 'Sander Tangvik', pos: 'G' },
  ],
  // Group J
  'Argentina': [
    { name: 'Lionel Messi', pos: 'F' }, { name: 'Nico Paz', pos: 'F' }, { name: 'Thiago Almada', pos: 'F' }, { name: 'Nicolas Gonzalez', pos: 'F' }, { name: 'Giuliano Simeone', pos: 'F' }, { name: 'Lautaro Martinez', pos: 'F' }, { name: 'Jose Manuel Lopez', pos: 'F' }, { name: 'Julian Alvarez', pos: 'F' },
    { name: 'Leandro Paredes', pos: 'M' }, { name: 'Rodrigo De Paul', pos: 'M' }, { name: 'Exequiel Palacios', pos: 'M' }, { name: 'Enzo Fernandez', pos: 'M' }, { name: 'Alexis Mac Allister', pos: 'M' }, { name: 'Giovani Lo Celso', pos: 'M' }, { name: 'Valentin Barco', pos: 'M' },
    { name: 'Gonzalo Montiel', pos: 'D' }, { name: 'Nahuel Molina', pos: 'D' }, { name: 'Lisandro Martinez', pos: 'D' }, { name: 'Nicolas Otamendi', pos: 'D' }, { name: 'Leonardo Balerdi', pos: 'D' }, { name: 'Cristian Romero', pos: 'D' }, { name: 'Facundo Medina', pos: 'D' }, { name: 'Nicolas Tagliafico', pos: 'D' },
    { name: 'Emiliano Martinez', pos: 'G' }, { name: 'Geronimo Rulli', pos: 'G' }, { name: 'Juan Musso', pos: 'G' },
  ],
  'Algeria': [
    { name: 'Mohamed Amine Amoura', pos: 'F' }, { name: 'Nadir Benbouali', pos: 'F' }, { name: 'Adil Boulbina', pos: 'F' }, { name: 'Fares Ghedjemis', pos: 'F' }, { name: 'Amine Gouiri', pos: 'F' }, { name: 'Riyad Mahrez', pos: 'F' }, { name: 'Anis Hadj Moussa', pos: 'F' },
    { name: 'Houssem Aouar', pos: 'M' }, { name: 'Nabil Bentaleb', pos: 'M' }, { name: 'Hicham Boudaoui', pos: 'M' }, { name: 'Fares Chaibi', pos: 'M' }, { name: 'Ibrahim Maza', pos: 'M' }, { name: 'Yassine Titraoui', pos: 'M' }, { name: 'Ramiz Zerrouki', pos: 'M' },
    { name: 'Achraf Abada', pos: 'D' }, { name: 'Rayan Ait Nouri', pos: 'D' }, { name: 'Zinedine Belaid', pos: 'D' }, { name: 'Rafik Belghali', pos: 'D' }, { name: 'Ramy Bensebaini', pos: 'D' }, { name: 'Samir Chergui', pos: 'D' }, { name: 'Jaouen Hadjam', pos: 'D' }, { name: 'Aissa Mandi', pos: 'D' }, { name: 'Mohamed Amine Tougai', pos: 'D' },
    { name: 'Oussama Benbot', pos: 'G' }, { name: 'Melvin Masstil', pos: 'G' }, { name: 'Luca Zidane', pos: 'G' },
  ],
  'Austria': [
    { name: 'Marko Arnautovic', pos: 'F' }, { name: 'Michael Gregoritsch', pos: 'F' }, { name: 'Sasa Kalajdzic', pos: 'F' },
    { name: 'Xaver Schlager', pos: 'M' }, { name: 'Nicolas Seiwald', pos: 'M' }, { name: 'Marcel Sabitzer', pos: 'M' }, { name: 'Florian Grillitsch', pos: 'M' }, { name: 'Carney Chukwuemeka', pos: 'M' }, { name: 'Romano Schmid', pos: 'M' }, { name: 'Christoph Baumgartner', pos: 'M' }, { name: 'Konrad Laimer', pos: 'M' }, { name: 'Patrick Wimmer', pos: 'M' }, { name: 'Paul Wanner', pos: 'M' }, { name: 'Alessandro Schopf', pos: 'M' },
    { name: 'David Affengruber', pos: 'D' }, { name: 'Kevin Danso', pos: 'D' }, { name: 'Stefan Posch', pos: 'D' }, { name: 'David Alaba', pos: 'D' }, { name: 'Philipp Lienhart', pos: 'D' }, { name: 'Philipp Mwene', pos: 'D' }, { name: 'Alexander Prass', pos: 'D' }, { name: 'Marco Friedl', pos: 'D' }, { name: 'Michael Svoboda', pos: 'D' },
    { name: 'Alexander Schlager', pos: 'G' }, { name: 'Florian Wiegele', pos: 'G' }, { name: 'Patrick Pentz', pos: 'G' },
  ],
  'Jordan': [
    { name: 'Mohammed Abu Zrayq', pos: 'F' }, { name: 'Mousa Al-Tamari', pos: 'F' }, { name: 'Ali Azaizeh', pos: 'F' }, { name: 'Odeh Al-Fakhouri', pos: 'F' }, { name: 'Ali Olwan', pos: 'F' }, { name: 'Ibrahim Sabra', pos: 'F' }, { name: 'Mahmoud Al-Mardi', pos: 'F' },
    { name: 'Mohammed Al-Dawoud', pos: 'M' }, { name: 'Nizar Al-Rashdan', pos: 'M' }, { name: 'Noor Al-Rawabdeh', pos: 'M' }, { name: 'Rajaei Ayed', pos: 'M' }, { name: 'Amer Jamous', pos: 'M' }, { name: 'Ibrahim Sadeh', pos: 'M' }, { name: 'Mohannad Abu Taha', pos: 'M' },
    { name: 'Ihsan Haddad', pos: 'D' }, { name: 'Saed Al-Rosan', pos: 'D' }, { name: 'Mohammad Abualnadi', pos: 'D' }, { name: 'Husam Abu Dahab', pos: 'D' }, { name: 'Mohammed Abu Hashish', pos: 'D' }, { name: 'Yazan Al-Arab', pos: 'D' }, { name: 'Anas Badawi', pos: 'D' }, { name: 'Abdallah Nasib', pos: 'D' }, { name: 'Saleem Obaid', pos: 'D' },
    { name: 'Yazid Abulaila', pos: 'G' }, { name: 'Abdallah Al-Fakhouri', pos: 'G' }, { name: 'Nour Bani Attiah', pos: 'G' },
  ],
  // Group K
  'Portugal': [
    { name: 'Cristiano Ronaldo', pos: 'F' }, { name: 'Rafael Leao', pos: 'F' }, { name: 'Joao Felix', pos: 'F' }, { name: 'Goncalo Ramos', pos: 'F' }, { name: 'Pedro Neto', pos: 'F' }, { name: 'Francisco Conceicao', pos: 'F' }, { name: 'Goncalo Guedes', pos: 'F' }, { name: 'Francisco Trincao', pos: 'F' },
    { name: 'Bruno Fernandes', pos: 'M' }, { name: 'Bernardo Silva', pos: 'M' }, { name: 'Vitinha', pos: 'M' }, { name: 'Joao Neves', pos: 'M' }, { name: 'Ruben Neves', pos: 'M' }, { name: 'Samu Costa', pos: 'M' },
    { name: 'Ruben Dias', pos: 'D' }, { name: 'Joao Cancelo', pos: 'D' }, { name: 'Diogo Dalot', pos: 'D' }, { name: 'Nuno Mendes', pos: 'D' }, { name: 'Nelson Semedo', pos: 'D' }, { name: 'Matheus Nunes', pos: 'D' }, { name: 'Goncalo Inacio', pos: 'D' }, { name: 'Renato Veiga', pos: 'D' }, { name: 'Tomas Araujo', pos: 'D' },
    { name: 'Diogo Costa', pos: 'G' }, { name: 'Jose Sa', pos: 'G' }, { name: 'Rui Silva', pos: 'G' },
  ],
  'Congo DR': [
    { name: 'Simon Banza', pos: 'F' }, { name: 'Yoane Wissa', pos: 'F' }, { name: 'Fiston Mayele', pos: 'F' }, { name: 'Cedric Bakambu', pos: 'F' },
    { name: 'Noah Sadiki', pos: 'M' }, { name: 'Charles Pickel', pos: 'M' }, { name: 'Edo Kayembe', pos: 'M' }, { name: 'Samuel Moutoussamy', pos: 'M' }, { name: "Ngal'ayel Mukau", pos: 'M' }, { name: 'Nathanael Mbuku', pos: 'M' }, { name: 'Meschak Elia', pos: 'M' }, { name: 'Brian Cipenga', pos: 'M' }, { name: 'Gael Kakuta', pos: 'M' }, { name: 'Theo Bongonda', pos: 'M' },
    { name: 'Chancel Mbemba', pos: 'D' }, { name: 'Axel Tuanzebe', pos: 'D' }, { name: 'Arthur Masuaku', pos: 'D' }, { name: 'Gedeon Kalulu', pos: 'D' }, { name: 'Joris Kayembe', pos: 'D' }, { name: 'Aaron Wan-Bissaka', pos: 'D' }, { name: 'Aaron Tshibola', pos: 'D' }, { name: 'Steve Kapuadi', pos: 'D' }, { name: 'Dylan Batubinsika', pos: 'D' },
    { name: 'Lionel Mpasi', pos: 'G' }, { name: 'Timothy Fayulu', pos: 'G' }, { name: 'Matthieu Epolo', pos: 'G' },
  ],
  'Uzbekistan': [
    { name: 'Azizbek Amonov', pos: 'F' }, { name: 'Igor Sergeev', pos: 'F' }, { name: 'Eldor Shomurodov', pos: 'F' },
    { name: 'Sherzod Esanov', pos: 'M' }, { name: 'Umarali Rakhmonaliev', pos: 'M' }, { name: 'Akmal Mozgovoy', pos: 'M' }, { name: 'Otabek Shukurov', pos: 'M' }, { name: 'Jamshid Iskanderov', pos: 'M' }, { name: 'Azizjon Ganiev', pos: 'M' }, { name: 'Abbosek Fayzullaev', pos: 'M' }, { name: 'Jaloliddin Masharipov', pos: 'M' }, { name: 'Dostonbek Khamdamov', pos: 'M' }, { name: 'Oston Urunov', pos: 'M' },
    { name: 'Avazbek Ulmasaliev', pos: 'D' }, { name: 'Jakhongir Urozov', pos: 'D' }, { name: 'Rustamjon Ashurmatov', pos: 'D' }, { name: 'Umarbek Eshmurodov', pos: 'D' }, { name: 'Abdukodir Khusanov', pos: 'D' }, { name: 'Abdulla Abdullaev', pos: 'D' }, { name: 'Farrukh Sayfiev', pos: 'D' }, { name: 'Khojiakbar Alijonov', pos: 'D' }, { name: 'Sherzod Nasrullaev', pos: 'D' }, { name: 'Behruz Karimov', pos: 'D' },
    { name: 'Utkir Yusupov', pos: 'G' }, { name: 'Botirali Ergashev', pos: 'G' }, { name: 'Abduvokhid Nematov', pos: 'G' },
  ],
  'Colombia': [
    { name: 'Luis Diaz', pos: 'F' }, { name: 'Jhon Cordoba', pos: 'F' }, { name: 'Luis Suarez', pos: 'F' }, { name: 'Andres Gomez', pos: 'F' }, { name: 'Cucho Hernandez', pos: 'F' },
    { name: 'Jorge Carrascal', pos: 'M' }, { name: 'Kevin Castano', pos: 'M' }, { name: 'Gustavo Puerta', pos: 'M' }, { name: 'Juan Fernando Quintero', pos: 'M' }, { name: 'Juan Portilla', pos: 'M' }, { name: 'Jefferson Lerma', pos: 'M' }, { name: 'Richard Rios', pos: 'M' }, { name: 'Jhon Arias', pos: 'M' }, { name: 'James Rodriguez', pos: 'M' }, { name: 'Jaminton Campaz', pos: 'M' },
    { name: 'Daniel Munoz', pos: 'D' }, { name: 'Jhon Lucumi', pos: 'D' }, { name: 'Santiago Arias', pos: 'D' }, { name: 'Davinson Sanchez', pos: 'D' }, { name: 'Johan Mojica', pos: 'D' }, { name: 'Yerry Mina', pos: 'D' }, { name: 'Willer Ditta', pos: 'D' }, { name: 'Deiver Machado', pos: 'D' },
    { name: 'David Ospina', pos: 'G' }, { name: 'Alvaro Montero', pos: 'G' }, { name: 'Camilo Vargas', pos: 'G' },
  ],
  // Group L
  'England': [
    { name: 'Harry Kane', pos: 'F' }, { name: 'Ivan Toney', pos: 'F' }, { name: 'Ollie Watkins', pos: 'F' }, { name: 'Bukayo Saka', pos: 'F' }, { name: 'Marcus Rashford', pos: 'F' }, { name: 'Anthony Gordon', pos: 'F' }, { name: 'Noni Madueke', pos: 'F' },
    { name: 'Declan Rice', pos: 'M' }, { name: 'Elliot Anderson', pos: 'M' }, { name: 'Kobbie Mainoo', pos: 'M' }, { name: 'Jordan Henderson', pos: 'M' }, { name: 'Morgan Rogers', pos: 'M' }, { name: 'Jude Bellingham', pos: 'M' }, { name: 'Eberechi Eze', pos: 'M' },
    { name: 'Reece James', pos: 'D' }, { name: 'Ezri Konsa', pos: 'D' }, { name: 'Jarell Quansah', pos: 'D' }, { name: 'John Stones', pos: 'D' }, { name: 'Marc Guehi', pos: 'D' }, { name: 'Dan Burn', pos: 'D' }, { name: 'Nico O\'Reilly', pos: 'D' }, { name: 'Djed Spence', pos: 'D' }, { name: 'Tino Livramento', pos: 'D' },
    { name: 'Jordan Pickford', pos: 'G' }, { name: 'Dean Henderson', pos: 'G' }, { name: 'James Trafford', pos: 'G' },
  ],
  'Croatia': [
    { name: 'Ivan Perisic', pos: 'F' }, { name: 'Andrej Kramaric', pos: 'F' }, { name: 'Ante Budimir', pos: 'F' }, { name: 'Marco Pasalic', pos: 'F' }, { name: 'Petar Musa', pos: 'F' }, { name: 'Igor Matanovic', pos: 'F' },
    { name: 'Luka Modric', pos: 'M' }, { name: 'Mateo Kovacic', pos: 'M' }, { name: 'Mario Pasalic', pos: 'M' }, { name: 'Nikola Vlasic', pos: 'M' }, { name: 'Luka Sucic', pos: 'M' }, { name: 'Martin Baturina', pos: 'M' }, { name: 'Kristijan Jakic', pos: 'M' }, { name: 'Petar Sucic', pos: 'M' }, { name: 'Nikola Moro', pos: 'M' }, { name: 'Toni Fruk', pos: 'M' },
    { name: 'Josko Gvardiol', pos: 'D' }, { name: 'Duje Caleta-Car', pos: 'D' }, { name: 'Josip Sutalo', pos: 'D' }, { name: 'Josip Stanisic', pos: 'D' }, { name: 'Marin Pongracic', pos: 'D' }, { name: 'Martin Erlic', pos: 'D' }, { name: 'Luka Vuskovic', pos: 'D' },
    { name: 'Dominik Livakovic', pos: 'G' }, { name: 'Dominik Kotarski', pos: 'G' }, { name: 'Ivor Pandur', pos: 'G' },
  ],
  'Ghana': [
    { name: 'Kamal Deen Sulemana', pos: 'F' }, { name: 'Christopher Bonsu Baah', pos: 'F' }, { name: 'Ernest Nuamah', pos: 'F' }, { name: 'Antoine Semenyo', pos: 'F' }, { name: 'Brandon Thomas-Asante', pos: 'F' }, { name: 'Prince Kwabena Adu', pos: 'F' }, { name: 'Inaki Williams', pos: 'F' }, { name: 'Jordan Ayew', pos: 'F' },
    { name: 'Elisha Owusu', pos: 'M' }, { name: 'Thomas Partey', pos: 'M' }, { name: 'Kwasi Sibo', pos: 'M' }, { name: 'Augustine Boakye', pos: 'M' }, { name: 'Caleb Yirenkyi', pos: 'M' }, { name: 'Abdul Fatawu Issahaku', pos: 'M' },
    { name: 'Baba Abdul Rahman', pos: 'D' }, { name: 'Gideon Mensah', pos: 'D' }, { name: 'Marvin Senaya', pos: 'D' }, { name: 'Alidu Seidu', pos: 'D' }, { name: 'Abdul Mumin', pos: 'D' }, { name: 'Jerome Opoku', pos: 'D' }, { name: 'Jonas Adjetey', pos: 'D' }, { name: 'Kojo Oppong Peprah', pos: 'D' }, { name: 'Derrick Luckassen', pos: 'D' },
    { name: 'Benjamin Asare', pos: 'G' }, { name: 'Lawrence Ati-Zigi', pos: 'G' }, { name: 'Joseph Anang', pos: 'G' },
  ],
  'Panama': [
    { name: 'Ismael Diaz', pos: 'F' }, { name: 'Cecilio Waterman', pos: 'F' }, { name: 'Jose Fajardo', pos: 'F' }, { name: 'Tomas Rodriguez', pos: 'F' },
    { name: 'Anibal Godoy', pos: 'M' }, { name: 'Adalberto Carrasquilla', pos: 'M' }, { name: 'Carlos Harvey', pos: 'M' }, { name: 'Cristian Martinez', pos: 'M' }, { name: 'Jose Luis Rodriguez', pos: 'M' }, { name: 'Cesar Yanis', pos: 'M' }, { name: 'Yoel Barcenas', pos: 'M' }, { name: 'Alberto Quintero', pos: 'M' }, { name: 'Azarias Londono', pos: 'M' },
    { name: 'Cesar Blackman', pos: 'D' }, { name: 'Jorge Gutierrez', pos: 'D' }, { name: 'Amir Murillo', pos: 'D' }, { name: 'Fidel Escobar', pos: 'D' }, { name: 'Andres Andrade', pos: 'D' }, { name: 'Edgardo Farina', pos: 'D' }, { name: 'Jose Cordoba', pos: 'D' }, { name: 'Eric Davis', pos: 'D' }, { name: 'Jiovany Ramos', pos: 'D' }, { name: 'Roderick Miller', pos: 'D' },
    { name: 'Orlando Mosquera', pos: 'G' }, { name: 'Luis Mejia', pos: 'G' }, { name: 'Cesar Samudio', pos: 'G' },
  ],
};

export function getSquadOrdered(team) {
  const players = SQUADS[team] || [];
  const order = { F: 0, M: 1, D: 2, G: 3 };
  return [...players].sort((a, b) => order[a.pos] - order[b.pos]);
}

// Helper to get player names only (backward compat)
export function getPlayerNames(team) {
  return (SQUADS[team] || []).map(p => p.name);
}
