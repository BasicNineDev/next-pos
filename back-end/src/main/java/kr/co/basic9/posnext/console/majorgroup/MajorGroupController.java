package kr.co.basic9.posnext.console.majorgroup;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import kr.co.basic9.posnext.console.majorgroup.model.MajorGroup;
import kr.co.basic9.posnext.console.majorgroup.service.MajorGroupService;


@RestController
@RequestMapping(value ="/api")
public class MajorGroupController {
	
	@Autowired
    MajorGroupService majorGroupService;  //Service which will do all data retrieval/manipulation work
 
     
    //-------------------Retrieve All Users--------------------------------------------------------
     
    @RequestMapping(value = "/major-groups", method = RequestMethod.GET)
    public ResponseEntity<List<MajorGroup>> listAllMajorGroups() {
        List<MajorGroup> majorGroups = majorGroupService.getAllMajorGroup();
        if(majorGroups.isEmpty()){
            return new ResponseEntity<List<MajorGroup>>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<>(majorGroups, HttpStatus.OK);
    }

    
    @RequestMapping(value = "/major-groups/{majorGroupRn}", method = RequestMethod.GET)
    public ResponseEntity<MajorGroup> majorgroupbyrn(@PathVariable int majorGroupRn) {
        MajorGroup majorGroup = majorGroupService.getMajorGroupByMajorGroupRn(majorGroupRn);
        if(majorGroup == null){
            return new ResponseEntity<MajorGroup>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<>(majorGroup, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/major-groups", method = RequestMethod.POST)
    public ResponseEntity<Void> createMajorGroup(@RequestBody MajorGroup majorGroup,    UriComponentsBuilder ucBuilder) {
        System.out.println("Creating MajorGroup " + majorGroup.getMajorGroupName());
 
        if (majorGroupService.isMajorGroupExist(majorGroup)) {
            //System.out.println("A MajorGroup with name " + majorGroup.getMajorGroupName() + " already exist");
            //return new ResponseEntity<Void>(HttpStatus.CONFLICT);
            majorGroupService.updateMajorGroup(majorGroup);
            HttpHeaders headers = new HttpHeaders();
            headers.setLocation(ucBuilder.path("/majorGroup/{majorGroupRn}").buildAndExpand(majorGroup.getMajorGroupRn()).toUri());
            return new ResponseEntity<Void>(headers, HttpStatus.OK);
        } 
 
        majorGroupService.addMajorGroup(majorGroup);
 
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/majorGroup/{majorGroupRn}").buildAndExpand(majorGroup.getMajorGroupRn()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }
    
    @RequestMapping(value = "/major-groups/{majorGroupRn}", method = RequestMethod.PUT)
    public ResponseEntity<MajorGroup> updateMajorGroup(@PathVariable("majorGroupRn") int majorGroupRn, @RequestBody MajorGroup majorGroup) {
        System.out.println("Updating MajorGroup " + majorGroupRn);
         
        MajorGroup currentMajorGroup = majorGroupService.getMajorGroupByMajorGroupRn(majorGroupRn);
        if (currentMajorGroup==null) {
            System.out.println("MajorGroup with majorGroupRn " + majorGroupRn + " not found");
            return new ResponseEntity<MajorGroup>(HttpStatus.NOT_FOUND);
        }
 
        currentMajorGroup.setMajorGroupName(majorGroup.getMajorGroupName());
        currentMajorGroup.setReportGroup(majorGroup.getReportGroup());
         
        majorGroupService.updateMajorGroup(currentMajorGroup);
        return new ResponseEntity<MajorGroup>(currentMajorGroup, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/major-groups/{majorGroupRn}", method = RequestMethod.DELETE)
    public ResponseEntity<MajorGroup> deleteMajorGroup(@PathVariable("majorGroupRn") int majorGroupRn) {
        System.out.println("Fetching & Deleting MajorGroup with majorGroupRn " + majorGroupRn);
 
        MajorGroup currentMajorGroup = majorGroupService.getMajorGroupByMajorGroupRn(majorGroupRn);
        if (currentMajorGroup==null) {
            System.out.println("MajorGroup with majorGroupRn " + majorGroupRn + " not found");
            return new ResponseEntity<MajorGroup>(HttpStatus.NOT_FOUND);
        }
 
        majorGroupService.deleteMajorGroupByMajorGroupRn(majorGroupRn);
        return new ResponseEntity<MajorGroup>(HttpStatus.NO_CONTENT);
    }

    
    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    public ResponseEntity<String> hello() {
        List<MajorGroup> majorGroups = majorGroupService.getAllMajorGroup();
        if(majorGroups.isEmpty()){
            return new ResponseEntity<String>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<String>("hello", HttpStatus.OK);
    }

    
    //-------------------Retrieve Single User--------------------------------------------------------
/*     
    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> getUser(@PathVariable("id") long id) {
        System.out.println("Fetching User with id " + id);
        User user = userService.findById(id);
        if (user == null) {
            System.out.println("User with id " + id + " not found");
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }
*/ 
     
     /*
    //-------------------Create a User--------------------------------------------------------
     
    @RequestMapping(value = "/user/", method = RequestMethod.POST)
    public ResponseEntity<Void> createUser(@RequestBody User user,    UriComponentsBuilder ucBuilder) {
        System.out.println("Creating User " + user.getName());
 
        if (userService.isUserExist(user)) {
            System.out.println("A User with name " + user.getName() + " already exist");
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
 
        userService.saveUser(user);
 
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/user/{id}").buildAndExpand(user.getId()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }
 
     
    //------------------- Update a User --------------------------------------------------------
     
    @RequestMapping(value = "/user/{id}", method = RequestMethod.PUT)
    public ResponseEntity<User> updateUser(@PathVariable("id") long id, @RequestBody User user) {
        System.out.println("Updating User " + id);
         
        User currentUser = userService.findById(id);
         
        if (currentUser==null) {
            System.out.println("User with id " + id + " not found");
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
 
        currentUser.setName(user.getName());
        currentUser.setAge(user.getAge());
        currentUser.setSalary(user.getSalary());
         
        userService.updateUser(currentUser);
        return new ResponseEntity<User>(currentUser, HttpStatus.OK);
    }
 
    //------------------- Delete a User --------------------------------------------------------
     
    @RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<User> deleteUser(@PathVariable("id") long id) {
        System.out.println("Fetching & Deleting User with id " + id);
 
        User user = userService.findById(id);
        if (user == null) {
            System.out.println("Unable to delete. User with id " + id + " not found");
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
 
        userService.deleteUserById(id);
        return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
    }
 
     
    //------------------- Delete All Users --------------------------------------------------------
     
    @RequestMapping(value = "/user/", method = RequestMethod.DELETE)
    public ResponseEntity<User> deleteAllUsers() {
        System.out.println("Deleting All Users");
 
        userService.deleteAllUsers();
        return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
    }*/
}
