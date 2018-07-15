// utils
String.format = function() {
  var s = arguments[0];
  for (var i = 0; i < arguments.length - 1; i++) {
    var reg = new RegExp("\\{" + i + "\\}", "gm");
    s = s.replace(reg, arguments[i + 1]);
  }
  return s;
}

function alertTODO() {
  alert('TODO implement this!!!')
}

var contactAdminMessage = "Please contact admin: buffxz@gmail.com"

var eduSectionIdInt = 1
var otherInfoIdInt = 1

var projectIdPrefix = 'project'
var bulletPointIdPrefix = 'bulletpoint'

var companyLabel = 'company'
var leadershipLabel = 'leadership'

var companyHTMLParent = 'all_companies'
var leadershipHTMLParent = 'all_leadership'

var bigFormPrefixMap = {
  [companyLabel]: companyLabel,
  [leadershipLabel]: leadershipLabel
}

var bigFormHTMLParentMap = {
  [companyLabel]: companyHTMLParent,
  [leadershipLabel]: leadershipHTMLParent
}

var bigFormCapLabelMap = {
  [companyLabel]: 'Company',
  [leadershipLabel]: 'Leadership'
}

var bigFormSectionIdIntMap = {
  [companyLabel]: 1,
  [leadershipLabel]: 1
}

var bigFormProjectAndBulletPointSegMap = {
  [companyLabel]: {},
  [leadershipLabel]: {}
}

function removeElement(elementId) {
  // Removes an element from the document
  var element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
}

function getEduSectionHTML(eduSectionId) {
  return String.format(
    `
    <h4>Education</h4>
    <div class="fields">
      <div class="field">
        <label>From</label>
        <input type="text" name="ed_from_{0}" placeholder="From">
      </div>
      <div class="field">
        <label>To</label>
        <input type="text" name="ed_to_{0}" placeholder="To">
      </div>
      <div class="eight wide field">
        <label>School</label>
        <input type="text" name="ed_school_{0}" placeholder="School">
      </div>
      <div class="eight wide field">
        <label>Location</label>
        <input type="text" name="ed_location_{0}" placeholder="Location">
      </div>
      <div class="eight wide field">
        <label>Major</label>
        <input type="text" name="ed_major_{0}" placeholder="Major">
      </div>
      <div class="field">
        <label>GPA</label>
        <input type="text" name="ed_gpa_{0}" placeholder="GPA">
      </div>
      <i class="minus circle icon" onclick="removeElement('{1}')"></i>
    </div>
    `, eduSectionIdInt, eduSectionId)
  // eduSectionId is used for removing the whole html only
}

function addEduSection() {
  var eduSectionId = 'edu_' + eduSectionIdInt
  var html = getEduSectionHTML(eduSectionId)

  addElement('all_edu', 'div', '', eduSectionId, html);
  eduSectionIdInt++;
}

function getOtherInfoHTML(otherInfoId) {
  return String.format(
    `
    <div class="fields">
      <div class="field">
        <input type="text" name="other_info_key_{0}" placeholder="Key, e.g. Skills">
      </div>
      <div class="eight wide field">
        <input type="text" name="other_info_value_{0}" placeholder="Value, e.g. Word, Excel and etc">
      </div>
      <input type="button" class="small ui button" value="Remove" onclick="removeElement('{1}')"  />
    </div>
    `, otherInfoIdInt, otherInfoId)
  // otherInfoId is only used to remove the entire html
}

function addOtherInfoSection() {
  nextOtherInfoId = otherInfoIdInt;
  otherInfoId = ['other_info', nextOtherInfoId].join('_');

  var html = getOtherInfoHTML(otherInfoId)
  addElement('other_info', 'div', '', otherInfoId, html);

  // update
  otherInfoIdInt++;
}

function getNextIdAsIntHelper(map, prefix) {
  if (Object.keys(map).length == 0) {
    nextCompanyIdAsInt = 1;
  } else {
    console.log(map);
    for (key in map) {
      console.log(key);
      console.log(key.substring(prefix.length, key.length));
      nextCompanyIdAsInt = parseInt(key.substring(prefix.length, key.length)) + 1;
    }
  }
  return nextCompanyIdAsInt
}

function generateID(prefix, levelID, ownIdAsInt) {
  if (prefix.length > 0) {
    return [levelID, prefix, ownIdAsInt].join('_')
  } else {
    return [levelID, ownIdAsInt].join('_')
  }
}

function addElement(parentId, elementTag, classType, elementId, html) {
  console.log("calling addElement parentId %s, elementTag %s, elementId %s, html %s",
    parentId, elementTag, elementId, html);
  var p = document.getElementById(parentId);
  console.log(p);
  var newElement = document.createElement(elementTag);
  newElement.setAttribute('id', elementId);
  newElement.setAttribute('class', classType);
  newElement.innerHTML = html;
  p.appendChild(newElement);
}

function getBPSectionHTML(BPId) {
  return String.format(
    `
    <div class="fields">

      <div class="sixteen wide field">
        <textarea rows="1" name="{0}_bullet_point"></textarea>
      </div>

      <i class="minus circle icon" onclick="removeElement('{0}')"></i>
    </div>
    `,
    BPId)
}

function addProjectLevelBulletPoint(label, companyId, projectId, htmlParentId) {
  nextBPIdAsInt = bigFormProjectAndBulletPointSegMap[label][projectId]
  BPId = generateID(bulletPointIdPrefix, projectId, nextBPIdAsInt)
  console.log("Adding bullet point %s for project id %s", BPId, projectId);

  // update
  bigFormProjectAndBulletPointSegMap[label][projectId] = nextBPIdAsInt + 1

  var html = getBPSectionHTML(BPId)
  addElement(htmlParentId, 'div', '', BPId, html);
}

function getProjectSectionHTML(label, companyId, projectId, allBPSectionId, displayLabel) {
  return String.format(
    `
    <div class="fields">
      <div class="eight wide field">
        <label>{4}</label>
        <input type="text" name="{1}_project_name" placeholder="{1}">
      </div>
      <i class="minus circle icon" onclick="removeElement('{1}')"></i>
    </div>

    <div class="fields">
      <input type="button" class="mini ui button" value="Add bulletpoint" onclick="addProjectLevelBulletPoint('{3}', '{0}', '{1}', '{2}')" />
    </div>

    <div id={2}>
    </div>
    `,
    companyId, projectId, allBPSectionId, label, displayLabel)
}

function addProject(label, bigFormId, htmlParentId) {
  nextProjectIdAsInt = bigFormProjectAndBulletPointSegMap[label][bigFormId]
  projectId = generateID(projectIdPrefix, bigFormId, nextProjectIdAsInt)

  // update
  curProjectIdAsInt = nextProjectIdAsInt
  bigFormProjectAndBulletPointSegMap[label][bigFormId] = nextProjectIdAsInt + 1
  bigFormProjectAndBulletPointSegMap[label][projectId] = 1 //bulletpoint id

  allBPSectionId = [projectId, 'bpsec'].join('_')
  displayLabel = 'Project ' + nextProjectIdAsInt

  console.log("Adding bigForm %s, project id %s, allBPSectionId %s", bigFormId, projectId, allBPSectionId);
  var html = getProjectSectionHTML(label, bigFormId, projectId, allBPSectionId, displayLabel)
  addElement(htmlParentId, 'div', '', projectId, html);

  return [projectId, allBPSectionId]
}

function getBigFormSectionHTML(label, bigFormId, allProjectSectionId, capLabel) {
  return String.format(
    `
    <h4>{3}</h4>
    <div class="fields">
      <div class="three wide field">
        <label>From</label>
        <input type="text" name="{0}_from" placeholder="From">
      </div>
      <div class="three wide field">
        <label>To</label>
        <input type="text" name="{0}_to" placeholder="To">
      </div>

      <div class="four wide field">
        <label>{3}</label>
        <input type="text" name="{0}" placeholder="{2} Name">
      </div>

      <div class="four wide field">
        <label>Location</label>
        <input type="text" name="{0}_location" placeholder="Location">
      </div>


      <div class="four wide field">
        <label>Title</label>
        <input type="text" name="{0}_title" placeholder="Title">
      </div>

      <div class="right floated column">
        <div class="middle aligned column">
        <!-- TODO: middle aligned doesn't work -->
          <i class="minus circle icon" onclick="removeElement('{0}')"></i>
        </div>
      </div>
    </div>

    <div class="fields">
      <input type="button" class="mini ui button" value="Add Project" onclick="addProject('{2}', '{0}', '{1}')" />
    </div>

    <div id={1}>
    </div>

    `,
    bigFormId, allProjectSectionId, label, capLabel)
}

function addBigFormSection(label) {
  htmlParentId = bigFormHTMLParentMap[label]
  currentSectionIdInt = bigFormSectionIdIntMap[label]
  capLabel = bigFormCapLabelMap[label]
  prefix = bigFormPrefixMap[label]

  bigFormId = generateID('', prefix, currentSectionIdInt);
  allProjectSectionId = generateID('allprojects_', prefix, currentSectionIdInt);
  console.log("Adding BigForm %s, allProjectSectionId %s", bigFormId, allProjectSectionId);

  //update
  bigFormProjectAndBulletPointSegMap[label][bigFormId] = 1;
  bigFormSectionIdIntMap[label] = currentSectionIdInt + 1

  var html = getBigFormSectionHTML(label, bigFormId, allProjectSectionId, capLabel);
  addElement(htmlParentId, 'div', '', bigFormId, html);

  return [bigFormId, allProjectSectionId]
}

function formToDict(formArray) {
  var result = {};
  for (var i = 0; i < formArray.length; i++) {
    result[formArray[i]['name']] = formArray[i]['value'];
  }
  return result;
}

function saveConfig() {
  var config_id = document.getElementById("config_id_input").value;
  console.log("Saving config id: " + config_id);

  var myForm = document.forms['resume_form']
  var dataJson = formToDict(myForm)
  delete dataJson[""];

  console.log(dataJson);

  $.ajax({
    type: "POST",
    url: "/save_config",
    contentType: "application/json",
    success: function(msg) {
      console.log(msg);
      alert('You config is saved as id: ' + config_id)
    },
    error: function(xhr, error) {
      console.log(xhr);
      alert('Failed to save your config due to: (' + xhr.responseText + ') ' + contactAdminMessage)
    },
    data: JSON.stringify(dataJson),
  });
}

function loadConfig() {
  var config_id = document.getElementById("config_id_input").value;
  console.log("Loading config id: " + config_id);

  $.ajax({
    type: "GET",
    url: "/fetch_config/" + config_id,
    success: function(msg) {
      console.log("loadConfig success");
      try {
        // msg is a json-object
        renderPageFromConfig(msg);
      } catch (err) {
        console.log(err);
        alert('Failed to load your config. \n' + err + '\n\n' + contactAdminMessage)
      }
    },
    error: function(xhr, error) {
      console.log(xhr);
      alert('Failed to load your config due to: (' + xhr.responseText + ') ' + contactAdminMessage)
    }
  });
}

function renderPageFromConfig(configJson) {
  console.log(configJson);
  inputDict = configJson['org']
  protoJson = configJson['proto']

  addSection(protoJson);
  for (var key in inputDict) {
    // console.log(key + ': ' + inputDict[key]);
    ele = document.getElementsByName(key)
    if (ele === undefined || ele.length == 0) {
      console.log("Skipping " + key + ': ' + inputDict[key]);
      continue
    }

    ele[0].value = inputDict[key];
  }
}

function addSection(configJson) {
  addSectionEdu(configJson['educations']);
  addSectionBigForm(companyLabel, configJson['workingExperiences']);
  addSectionBigForm(leadershipLabel, configJson['leadership_experiences']);
  addSectionOtherInfo(configJson['other_info']);
}

function addSectionEdu(listOfEdu) {
  if (!listOfEdu) {
    return
  }

  for (var i = 0; i < listOfEdu.length; i++) {
    addEduSection()
  }
}

function addSectionBigForm(label, listOfExperiences) {
  if (!listOfExperiences) {
    return
  }

  prefix = bigFormPrefixMap[label];
  for (var i = 0; i < listOfExperiences.length; i++) {
    experience = listOfExperiences[i];

    [bigFormId, allProjectSectionId] = addBigFormSection(label);

    listOfProjects = experience['projects']
    if (!listOfProjects) {
      continue
    }

    for (var j = 0; j < listOfProjects.length; j++) {
      project = listOfProjects[j];
      [projectId, allBPSectionId] = addProject(label, bigFormId, allProjectSectionId);

      listOfBulletPoints = project['bulletPoints']
      if (!listOfBulletPoints) {
        continue
      }

      console.log(listOfBulletPoints);
      for (var k = 0; k < listOfBulletPoints.length; k++) {
        addProjectLevelBulletPoint(label, bigFormId, projectId, allBPSectionId)
      }
    }

  }
}

function addSectionOtherInfo(listOfInfo) {
  if (!listOfInfo) {
    return
  }
}

function compilePDF() {
  console.log("Compiling pdf...");
  var myForm = document.forms['resume_form']
  var data = formToDict(myForm)
  // empty key would result into error on backend
  delete data[""];

  var scale = $('input[name=frequency]:checked', '#style_form').val();
  var requestData = {
    'data': data,
    'style': scale
  };
  console.log("Input: " + JSON.stringify(requestData));

  $.ajax({
    type: "POST",
    url: "/compile",
    contentType: "application/json",
    success: function(msg) {
      console.log("session id: " + msg);
      session_id = msg
      pdf_by_sess_id(session_id)
    },
    error: function(xhr, error) {
      console.log(xhr);
      alert('Failed to compilePDF: (' + xhr.responseText + ') \n\n' + contactAdminMessage)
    },
    data: JSON.stringify(requestData),
  });
}

function pdf_by_sess_id(session_id) {
  var objElement = document.getElementById('pdf_vis_obj');
  var iframeElement = document.getElementById('pdf_vis_iframe');
  objElement.setAttribute('data', 'pdf/' + session_id);
  iframeElement.setAttribute('src', 'pdf/' + session_id);
}