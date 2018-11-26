package kr.co.basic9.posnext.console.majorgroup.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data 
@Alias("majorGroup")
public class MajorGroup {
	public int getMajorGroupRn() {
		return majorGroupRn;
	}

	public void setMajorGroupRn(int majorGroupRn) {
		this.majorGroupRn = majorGroupRn;
	}

	public String getMajorGroupName() {
		return majorGroupName;
	}

	public void setMajorGroupName(String majorGroupName) {
		this.majorGroupName = majorGroupName;
	}

	public int getReportGroup() {
		return reportGroup;
	}

	public void setReportGroup(int reportGroup) {
		this.reportGroup = reportGroup;
	}

	private int majorGroupRn;
	private String majorGroupName;
	private int reportGroup;
	
	public MajorGroup() {
		
	}
	
	public MajorGroup(String majorGroupName, int reportGroup) {
		this.majorGroupName = majorGroupName;
		this.reportGroup = reportGroup;
	}
	/*
	public long getMajorGroupRn() {
		return majorGroupRn;
	}

	public void setMajorGroupRn(long majorGroupRn) {
		this.majorGroupRn = majorGroupRn;
	}

	public String getMajorGroupName() {
		return majorGroupName;
	}

	public void setMajorGroupName(String majorGroupName) {
		this.majorGroupName = majorGroupName;
	}

	public int getReportGroup() {
		return reportGroup;
	}

	public void setReportGroup(int reportGroup) {
		this.reportGroup = reportGroup;
	}*/
}
