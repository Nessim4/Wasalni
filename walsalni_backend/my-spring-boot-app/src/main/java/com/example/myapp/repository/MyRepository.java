package com.example.myapp.repository;

import com.example.myapp.model.MyModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyRepository extends JpaRepository<MyModel, Long> {
}