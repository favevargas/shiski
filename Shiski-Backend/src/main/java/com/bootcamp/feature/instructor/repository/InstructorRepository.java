package com.bootcamp.feature.instructor.repository;

import com.bootcamp.feature.instructor.model.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstructorRepository extends JpaRepository<Instructor, Long> {
}