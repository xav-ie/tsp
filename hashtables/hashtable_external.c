#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <stdint.h>
#include <stdbool.h>

#define MAX_NAME 256
#define TABLE_SIZE 10


typedef struct 
{
    char name[MAX_NAME];
    int age;
    struct person* next;
} person;

person * hash_table[TABLE_SIZE];


unsigned int hash(char *name){
    int length = strnlen(name, MAX_NAME);
    unsigned int hash_value = 0;
    for(int i=0; i< length; i++) {
        hash_value += name[i];
        hash_value = (hash_value*name[i]) % TABLE_SIZE;
    }
    return hash_value;
}

void init_hash_table() {
    for (int i = 0; i < TABLE_SIZE; i++)
    {
        hash_table[i] = NULL;
    }
}

bool hash_table_insert(person *p) {
    if(p==NULL) return false;
    int index = hash(p->name);
    p->next = hash_table[index];
    hash_table[index] = p;
    return true;    
}

void print_table() {
    printf("{\n");
    for (int i = 0; i < TABLE_SIZE; i++)
    {
        if (hash_table[i] == NULL){
            printf("\t%i\t---\n", i);
        } else {
            printf("\t%i\t", i);
            person* temp = hash_table[i];
            while(temp!=NULL) {
                printf("%s -> ", temp->name);
                temp = temp->next;
            }
            printf("\n");
        }
    }
    printf("}\n");
}

person * hash_table_lookup(char* name){
    int index = hash(name);
    person* temp = hash_table[index];
    while(temp != NULL && strncmp(temp->name, name, MAX_NAME)!=0) {
        temp = temp->next;
    }
    return temp;
}

person* hash_table_delete(char* name) {
    int index = hash(name);
    person* temp = hash_table[index];
    person* prev = NULL;
    while(temp != NULL && strncmp(temp->name, name, MAX_NAME)!=0) {
        prev = temp;
        temp = temp->next;
    }
    if(temp == NULL) return NULL;
    if(prev == NULL) {
        // we are deleting the head of the list
        hash_table[index] = temp->next;
    } else {
        prev->next = temp->next;
    }
    return temp;
}

int main() {
    init_hash_table();
    print_table();
    person jacob = {.name="Jacob", .age=256};
    person kate = {.name="Kate", .age=27};
    person mpho = {.name="Mpho", .age=14};
    person sarah = {.name="Sarah", .age=54};
    person edna = {.name="Edna", .age=15};
    person maren = {.name="Maren", .age=25};
    person eliza = {.name="Eliza", .age=34};
    person robert = {.name="Robert", .age=1};
    person jane = {.name="Jane", .age=75};



    printf("\nInserting values...\n");
    hash_table_insert(&jacob);
    hash_table_insert(&kate);
    hash_table_insert(&mpho);
    hash_table_insert(&sarah);
    hash_table_insert(&edna);
    hash_table_insert(&maren);
    hash_table_insert(&eliza);
    hash_table_insert(&robert);
    hash_table_insert(&jane);

    print_table();
    
    printf("\nLooking for 'Mpho'...\n");
    person* tmp = hash_table_lookup("Mpho");
    if (tmp == NULL) {
        printf("Not found!\n");
    } else {
        printf("Found %s and they are %i years old.\n", tmp->name, tmp->age);
    }

    printf("\nLooking for 'George'...\n");
    tmp = hash_table_lookup("George");
    if (tmp == NULL) {
        printf("Not found!\n");
    } else {
        printf("Found %s and they are %i years old.\n", tmp->name, tmp->age);
    }

    printf("\nDeleting 'Mpho'...\n");
    tmp = hash_table_delete("Mpho");

    printf("\nLooking for 'Mpho'...\n");
    tmp = hash_table_lookup("Mpho");
    if (tmp == NULL) {
        printf("Not found!\n");
    } else {
        printf("Found %s and they are %i years old.\n", tmp->name, tmp->age);
    }

    print_table();
    return 0;
}
