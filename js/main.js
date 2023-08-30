const getTeamJson = () => JSON.parse(localStorage.getItem("teams")) || [];
const setTeamJson = (newTeam = []) => {
  const teamJson = getTeamJson();
  localStorage.setItem("teams", JSON.stringify([...teamJson, ...newTeam]));
};

const init = () => {
  // Retrieve the team data from local storage
  const teams = getTeamJson();
  console.log(teams, "teams");

  if (teams.length) {
    console.log(teams, teams);
    // Process the data and display it on the page
    const teamListSidebar = document.querySelector(".team-list");
    console.log(teamListSidebar, "teamListSidebar");
    let teamListSidebarHtml = "";
    teams.forEach((team, index) => {
      teamListSidebarHtml += `<a class="nav-link href="#"> ${team.name} <span class="number-badge">${team.members.length}</span></a>`;
    });
    teamListSidebar.innerHTML = teamListSidebarHtml;
  } else {
    setTeamJson();
    console.log("Team data not found in local storage.");
  }
};

function setSampleData() {
  // Sample team data
  const teams = [
    { id: 1, name: "Team A", members: ["Alice", "Bob"] },
    { id: 2, name: "Team B", members: ["Charlie", "David", "Andrew", "John"] },
  ];
  // Store the data in local storage
  localStorage.setItem("teams", JSON.stringify(teams));
}
// setSampleData();

const getInputValues = () => {
  const teamName = document.querySelector(".team-input").value;
  const teamMemberInputNodeList = document.querySelectorAll(".member-input");
  const teamMembers = [];

  // Loop through the NodeList and get the values
  for (let i = 0; i < teamMemberInputNodeList.length; i++) {
    const inputValue = teamMemberInputNodeList[i].value;
    teamMembers.push(inputValue);
  }

  return [teamName, teamMembers];
};

const resetInputValues = () => {
  document.querySelector(".team-input").value = "";
  const teamMemberInputNodeList = document.querySelectorAll(".member-input");

  // Loop through the NodeList and get the values
  for (let i = 0; i < teamMemberInputNodeList.length; i++) {
    teamMemberInputNodeList[i].value = "";
  }
};

// JavaScript function to handle the "Reset" button click event
const resetForm = () => {
  resetInputValues();
  // alert("Reset button clicked");
};

const getFormData = () => {};

// JavaScript function to handle the "Save" button click event
const saveForm = () => {
  const [teamName, teamMembers] = getInputValues();

  const saveTeamData = {
    id: Date.now(),
    name: teamName,
    members: teamMembers,
  };

  setTeamJson([saveTeamData]);

  resetInputValues();

  init();

  // console.log(teamName, "teamName");
  // console.log(teamMemberInputNodeList, "teamMemberInputNodeList");
  // console.log(teamMembers, "teamMembers");
  // console.log(saveTeamData, "saveTeamData");

  // // Replace this with your save logic
  // alert("Save button clicked");
};

document.addEventListener("DOMContentLoaded", function () {
  init();

  document.getElementById("saveButton").addEventListener("click", saveForm);
  document.getElementById("resetButton").addEventListener("click", resetForm);
});
