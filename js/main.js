const getTeamJson = () => JSON.parse(localStorage.getItem("teams")) || [];
const setTeamJson = (teams = []) => {
  localStorage.setItem("teams", JSON.stringify(teams));
};

const removeActiveClassFromAllSidebarAnchors = () => {
  const sidebarTeamAnchors = document.querySelectorAll(".sidebar-team-anchors");

  // Attach the click event handler to each element with the class "myClass"
  sidebarTeamAnchors.forEach(function (sidebarTeamAnchor) {
    sidebarTeamAnchor.classList.remove("active");
  });
};

const resetMainContent = () => {
  removeActiveClassFromAllSidebarAnchors();

  localStorage.setItem("selectedTeamId", null);

  document.getElementById("main-content-title").innerHTML = "Create New Team";

  document.querySelector("#delete-team-button-container").innerHTML = "";

  document.querySelector(".team-input").value = "";

  const teamMembersContainer = document.querySelector(
    ".team-members-container"
  );

  let teamMembersHtml = `
    <div class="input-group">
      <input
        type="text"
        class="form-control member-input"
        placeholder="Enter Member Name"
      />
    </div>
  `;

  teamMembersContainer.innerHTML = teamMembersHtml;
};

const handleDisplayMainContentOnSelectedTeam = (e) => {
  const element = e.target;

  removeActiveClassFromAllSidebarAnchors();

  element.classList.add("active");

  document.getElementById("main-content-title").innerHTML = "Update Team";

  const teamId = Number(element.dataset.id);

  localStorage.setItem("selectedTeamId", teamId);

  const teams = getTeamJson();

  const team = teams.find((currentTeam) => currentTeam.id === teamId);
  // console.log(teams, 'teams')
  // console.log(teamId, 'teamId')
  console.log(team, "team");

  document.querySelector(".team-input").value = team.name;

  const teamMembersContainer = document.querySelector(
    ".team-members-container"
  );

  let teamMembersHtml = "";

  team.members.forEach((teamMemberName, index) => {
    teamMembersHtml += `
    <div class="input-group">
      <input
        type="text"
        class="form-control member-input"
        placeholder="Enter Member Name"
        value="${teamMemberName}"
      />
      ${
        index != 0
          ? '<button class="btn btn-danger delete-member-button">x</button>'
          : ""
      }
      
    </div>
  `;
  });

  teamMembersContainer.innerHTML = teamMembersHtml;

  document.querySelector("#delete-team-button-container").innerHTML = `
    <button id="delete-team-button-container" class="btn btn-danger float-end mb-3">
      Delete
    </button>
  `;

  document
    .getElementById("delete-team-button-container")
    .addEventListener("click", (e) => {
      const teams = getTeamJson();
      const selectedTeamIndex = teams.findIndex(
        (selectedTeam) => selectedTeam.id === team.id
      );

      teams.splice(selectedTeamIndex, 1);

      setTeamJson(teams);

      resetMainContent();
      init();
    });

  // Geting all elements with the class "delete-member-button"
  const deleteMemberButtons = document.querySelectorAll(
    ".delete-member-button"
  );

  // Attach the click event handler to each element with the class "myClass"
  deleteMemberButtons.forEach(function (deleteMemberButton) {
    deleteMemberButton.addEventListener("click", deleteMember);
  });

  document.getElementById("main-content-title").innerHTML = "Update Team";
};

const init = () => {
  localStorage.setItem("selectedTeamId", null);

  // Retrieve the team data from local storage
  const teams = getTeamJson();
  // console.log(teams, "teams");

  if (teams.length) {
    console.log(teams, teams);
    // Process the data and display it on the page
    const teamListSidebar = document.querySelector(".team-list");
    console.log(teamListSidebar, "teamListSidebar");
    let teamListSidebarHtml = "";
    teams.forEach((team) => {
      teamListSidebarHtml += `<a class="sidebar-team-anchors nav-link" data-id="${team.id}" href="#"> ${team.name} <span class="number-badge">${team.members.length}</span></a>`;
    });
    teamListSidebar.innerHTML = teamListSidebarHtml;

    const sidebarTeamAnchors = document.querySelectorAll(
      ".sidebar-team-anchors"
    );

    // Attach the click event handler to each element with the class "myClass"
    sidebarTeamAnchors.forEach(function (sidebarTeamAnchor) {
      sidebarTeamAnchor.addEventListener(
        "click",
        handleDisplayMainContentOnSelectedTeam
      );
    });
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

// Function to handle the "Reset" button click event
const resetForm = () => {
  resetInputValues();

  // alert("Reset button clicked");
};

// Function to handle the "Save" button click event
const saveForm = () => {
  const [teamName, teamMembers] = getInputValues();

  const newTeam = {
    id: Date.now(),
    name: teamName,
    members: teamMembers,
  };

  const selectedTeamId = JSON.parse(localStorage.getItem("selectedTeamId"));

  const previousTeamJson = getTeamJson();
  console.log(previousTeamJson, "previousTeamJson");
  console.log(selectedTeamId, "selectedTeamId");
  if (selectedTeamId) {
    console.log("inside if");
    const selectedTeamIndex = previousTeamJson.findIndex(
      (team) => team.id === Number(selectedTeamId)
    );
    console.log(selectedTeamIndex, "selectedTeamIndex");

    if (selectedTeamIndex !== -1) {
      previousTeamJson.splice(selectedTeamIndex, 1, newTeam);
      localStorage.setItem("selectedTeamId", null);

      console.log([...previousTeamJson], "[...previousTeamJson]");

      setTeamJson([...previousTeamJson]);
    }
  } else {
    console.log("inside else");
    console.log([...previousTeamJson, newTeam], "==adsfasas");
    setTeamJson([...previousTeamJson, newTeam]);
  }

  resetInputValues();

  resetMainContent();

  init();
  // alert("Save button clicked");
};

const addMember = () => {
  const teamMembersContainer = document.querySelector(
    ".team-members-container"
  );

  let teamMembersHtml = `
    <div class="input-group">
      <input
        type="text"
        class="form-control member-input"
        placeholder="Enter Member Name"
      />
      <button class="btn btn-danger delete-member-button">x</button>
    </div>
  `;

  teamMembersContainer.insertAdjacentHTML("beforeend", teamMembersHtml);

  // Geting all elements with the class "delete-member-button"
  const deleteMemberButtons = document.querySelectorAll(
    ".delete-member-button"
  );

  // Attach the click event handler to each element with the class "myClass"
  deleteMemberButtons.forEach(function (deleteMemberButton) {
    deleteMemberButton.addEventListener("click", deleteMember);
  });
};

const deleteMember = (e) => {
  // Find the parent element with the class "input-group"
  const inputGroup = e.target.closest(".input-group");

  if (inputGroup) {
    inputGroup.remove();
  }
};

document.addEventListener("DOMContentLoaded", function () {
  init();

  document.getElementById("saveButton").addEventListener("click", saveForm);
  document.getElementById("resetButton").addEventListener("click", resetForm);
  document.getElementById("addMember").addEventListener("click", addMember);
  document
    .getElementById("newTeam")
    .addEventListener("click", resetMainContent);
});
