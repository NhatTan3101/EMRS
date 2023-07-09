package main

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type SmartContract struct {
	contractapi.Contract
}

type Record struct {
	RecordId string `json:"RecordId"`
	HashCode string `json:"HashCode"`
}

func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	return nil
}

func (s *SmartContract) CreateRecord(ctx contractapi.TransactionContextInterface, recordId string, hashCode string) error {

	var record = Record{
		RecordId: recordId, // firebase
		HashCode: hashCode, // hash data
	}

	recordCodeAsBytes, _ := json.Marshal(record)
	return ctx.GetStub().PutState(record.RecordId, recordCodeAsBytes)
}

func (s *SmartContract) UpdateRecord(ctx contractapi.TransactionContextInterface, recordId string, hashCode string) error {

	recordCodeAsBytes, _ := ctx.GetStub().GetState(recordId)
	if recordCodeAsBytes == nil {
		return fmt.Errorf("cannot find this hash code")
	}

	record := new(Record)
	_ = json.Unmarshal(recordCodeAsBytes, record) // convert ledger to data
	record.HashCode = hashCode

	recordCodeAsBytes, _ = json.Marshal(record) // convert data to ledger

	return ctx.GetStub().PutState(record.RecordId, recordCodeAsBytes)
}

func (s *SmartContract) GetRecord(ctx contractapi.TransactionContextInterface, recordId string) (*Record, error) {

	recordCodeAsBytes, err := ctx.GetStub().GetState(recordId)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state. %s", err.Error())
	}

	if recordCodeAsBytes == nil {
		return nil, fmt.Errorf("%s does not exist", recordId)
	}

	record := new(Record)
	_ = json.Unmarshal(recordCodeAsBytes, &record)

	return record, nil
}

// MAIN FUNCTION
func main() {
	chaincode, err := contractapi.NewChaincode(new(SmartContract))

	if err != nil {
		fmt.Printf("Error create fsc chaincode: %s", err.Error())
		return
	}

	if err := chaincode.Start(); err != nil {
		fmt.Printf("Error starting fsc chaincode: %s", err.Error())
	}
}
