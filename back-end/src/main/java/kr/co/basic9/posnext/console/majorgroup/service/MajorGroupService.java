package kr.co.basic9.posnext.console.majorgroup.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.basic9.posnext.console.majorgroup.mapper.MajorGroupMapper;
import kr.co.basic9.posnext.console.majorgroup.model.MajorGroup;

@Service
@Transactional
public class MajorGroupService {
	 	
		@Autowired
		MajorGroupMapper majorGroupMapper;
		
		
		public MajorGroup getMajorGroupByMajorGroupRn(int majorGroupRn) {
			return majorGroupMapper.selectMajorGroupByMajorGroupRn(majorGroupRn);
		}
		
		public List<MajorGroup> getAllMajorGroup() {
			return majorGroupMapper.selectAllMajorGroup();
		}
		
		public void addMajorGroup(MajorGroup majorGroup) {
			majorGroupMapper.insertMajorGroup(majorGroup);
		}

		public boolean isMajorGroupExist(MajorGroup majorGroup) {
			return majorGroupMapper.isMojorGroupExist(majorGroup.getMajorGroupName());
		}

		public void updateMajorGroup(MajorGroup majorGroup) {
			majorGroupMapper.updateMajorGroup(majorGroup);
		}
		
		public void deleteMajorGroupByMajorGroupRn(int majorGroupRn) {
			majorGroupMapper.deleteMajorGroup(majorGroupRn);
		}
		
}
