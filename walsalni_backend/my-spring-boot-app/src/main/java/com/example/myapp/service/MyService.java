package com.example.myapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.myapp.model.MyModel;
import com.example.myapp.repository.MyRepository;

import java.util.List;
import java.util.Optional;

@Service
public class MyService {

    private final MyRepository myRepository;

    @Autowired
    public MyService(MyRepository myRepository) {
        this.myRepository = myRepository;
    }

    public List<MyModel> findAll() {
        return myRepository.findAll();
    }

    public Optional<MyModel> findById(Long id) {
        return myRepository.findById(id);
    }

    public MyModel save(MyModel myModel) {
        return myRepository.save(myModel);
    }

    public void deleteById(Long id) {
        myRepository.deleteById(id);
    }
}