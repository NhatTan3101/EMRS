package main

import (
	"encoding/json"
	"fmt"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type SmartContract struct {
	contractapi.Contract
}

type CounterNO struct {
	Counter int `json:"counter"`
}

type HashCode struct {
	Key            string `json:"Key"`
	RecordId       string `json:"RecordId"`
	HashCode       string `json:"HashCode"`
}

func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {

	error := initCounter(ctx)

	if error != nil {
		return fmt.Errorf("error init counter: %s", error.Error())
	}

	return nil
}

/* UTIL FUNCTIONS
INIT COUNTER
GET COUNTER
INCREMENT COUNTER
GET TX TIMESTAMP
CHECK USER
*/

func initCounter(ctx contractapi.TransactionContextInterface) error {

	// Initializing Hashcode Counter
	hashCodeCounterBytes, _ := ctx.GetStub().GetState("hashCodeCounterNO")
	if hashCodeCounterBytes == nil {
		var hashCodeCounter = CounterNO{Counter: 0}
		hashCodeCounterBytes, _ := json.Marshal(hashCodeCounter)
		err := ctx.GetStub().PutState("hashCodeCounterNO", hashCodeCounterBytes)
		if err != nil {
			return fmt.Errorf("failed to intitate hash counter: %s", err.Error())
		}
	} else {
		counter := new(CounterNO)
		_ = json.Unmarshal(hashCodeCounterBytes, counter)
		var hashCodeCounter = CounterNO{Counter: counter.Counter}
		hashCodeCounterBytes, _ := json.Marshal(hashCodeCounter)
		err := ctx.GetStub().PutState("hashCodeCounterNO", hashCodeCounterBytes)
		if err != nil {
			return fmt.Errorf("failed to intitate hash counter: %s", err.Error())
		}
	}

	return nil
}

func getCounter(ctx contractapi.TransactionContextInterface, assetType string) (int, error) {
	counterAsBytes, _ := ctx.GetStub().GetState(assetType)
	counterAsset := CounterNO{}

	json.Unmarshal(counterAsBytes, &counterAsset)

	return counterAsset.Counter, nil
}

func incrementCounter(ctx contractapi.TransactionContextInterface, assetType string) (int, error) {

	counterAsBytes, _ := ctx.GetStub().GetState(assetType)
	counterAsset := CounterNO{}

	json.Unmarshal(counterAsBytes, &counterAsset)
	counterAsset.Counter++
	updateCounterAsBytes, _ := json.Marshal(counterAsset)

	err := ctx.GetStub().PutState(assetType, updateCounterAsBytes)
	if err != nil {
		return -1, fmt.Errorf("failed to increment counter: %s", err.Error())
	}

	return counterAsset.Counter, nil
}


// func (s *SmartContract) CreateHashCode(ctx contractapi.TransactionContextInterface, key string, recordId string, hashCode string) string {

// 	hashCodeCounter, _ := getCounter(ctx, "HashCodeCounterNO")
// 	hashCodeCounter++

// 	var hash = HashCode{
// 		Key:         "" + strconv.Itoa(hashCodeCounter),
// 		RecordId:    recordId,
// 		HashCode:    hashCode,
// 	}

// 	hashCodeAsBytes, _ := json.Marshal(hash)
// 	incrementCounter(ctx, "RawCounterNO")
// 	_ = ctx.GetStub().PutState(hash.Key, hashCodeAsBytes)

// 	return hash.Key
// }

func (s *SmartContract) UpdateHashCode(ctx contractapi.TransactionContextInterface, key string, recordId string, hashCode string) error {

	hashCodeAsBytes, _ := ctx.GetStub().GetState(key)
	if hashCodeAsBytes == nil {
		return fmt.Errorf("cannot find this hash code")
	}

	hash := new(HashCode)
	_ = json.Unmarshal(hashCodeAsBytes, hash)
	hash.RecordId = recordId
	hash.HashCode = hashCode
	hashCodeAsBytes, _ = json.Marshal(hash)

	return ctx.GetStub().PutState(hash.RecordId, hashCodeAsBytes)
}


func (s *SmartContract) GetHashCode(ctx contractapi.TransactionContextInterface, key string) (*HashCode, error) {

	hashCodeAsBytes, err := ctx.GetStub().GetState(key)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state. %s", err.Error())
	}

	if hashCodeAsBytes == nil {
		return nil, fmt.Errorf("%s does not exist", key)
	}

	hash := new(HashCode)
	_ = json.Unmarshal(hashCodeAsBytes, &hash)

	return hash, nil
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
