import { JSON_URL } from './constants/constants';

const parties = [ 'all' ];

fetch(JSON_URL).then(response => {
    return response.json();
  }).then( data => {
    const parliamentMembers = data.personlista.person.map( person => {
      const parliamentMember = {
        party: person.parti,
        name: `${person.tilltalsnamn} ${person.efternamn}`
      }
      if (!parties.includes(person.parti)) parties.push(person.parti);
      return parliamentMember;
    }).sort( (a, b) => {
      if(a.party < b.party) { return -1; };
      if(a.party > b.party) { return 1; };
      return 0;
    });

  // creates default list - all
  createList(parliamentMembers);
  // creates filter options
  createFilterOptions();
  // gets select options
  const filterOptions = [...document.querySelectorAll('.filter select')];
  // Selected option event listener
  for (const option of filterOptions) {
    option.addEventListener('change', () => {
      const selectedOption = filterOptions.map(filter => filter.value).filter(Boolean)[0];
      const filteredMembers = selectedOption === 'all' ? parliamentMembers : parliamentMembers.filter( member => member.party === selectedOption);
      // removes current list
      document.querySelectorAll('li').forEach( li => li.parentNode.removeChild(li));
      // creates filtered list
      createList(filteredMembers)
    });
  }

});

// helpers
const createList = (parliamentMembersList) => {
  parliamentMembersList.map( member => {
    const node = document.createElement("li");
    node.appendChild(document.createTextNode(`${member.party} - ${member.name}`));
    document.getElementById("parlamient-list").appendChild(node);
  })
}

const createFilterOptions = () => {
  parties.map( party => {
    const node = document.createElement("option");
    node.appendChild(document.createTextNode(`${party}`))
    node.setAttribute('value', party);
    document.getElementById("parties").appendChild(node);
  })
}