package kr.co.basic9.posnext.console.majorgroup.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.basic9.posnext.console.majorgroup.model.MajorGroup;

@Mapper
public interface MajorGroupMapper {
	MajorGroup selectMajorGroupByMajorGroupRn(int majorGroupRn);
	List<MajorGroup> selectAllMajorGroup();
	void insertMajorGroup(MajorGroup majorGroup);
	void updateMajorGroup(MajorGroup majorGroup);
	boolean isMojorGroupExist(String majorGroupName);
	void deleteMajorGroup(int majorGroupRn);
}
